import { buildClassificationPrompt } from "./prompt-builder"
import { callAI } from "./provider"
import { ClassificationSchema } from "./schema"
import { fallbackClassification } from "./fallback"
import { AI_CONFIDENCE_THRESHOLD, AI_TIMEOUT } from "./config"
import { generateEmbedding } from "./embeddings"
import { retrieveContext } from "./retrieve-context"

function extractJSON(text: string) {
  const match = text.match(/\{[\s\S]*\}/)
  return match ? match[0] : null
}

async function fetchRAGContext(title: string, description: string): Promise<string> {
  try {
    const embedding = await generateEmbedding(`${title} ${description}`)
    const contextDocs = await retrieveContext(embedding)
    return contextDocs
      .slice(0, 3)
      .map((d: any) => d.content)
      .join("\n")
  } catch {
    return ""
  }
}

export async function classifyTicket(title: string, description: string) {
  // Race RAG context against a short deadline — AI call starts immediately after
  const ragContext = await Promise.race([
    fetchRAGContext(title, description),
    new Promise<string>(resolve => setTimeout(() => resolve(""), 2000)) // RAG cap: 2s
  ])

  const prompt = buildClassificationPrompt({ title, description, context: ragContext })

  let raw: string
  try {
    raw = await Promise.race([
      callAI(prompt),
      new Promise<string>((_, reject) =>
        setTimeout(() => reject(new Error("AI timeout")), AI_TIMEOUT)
      )
    ])
  } catch (err) {
    console.warn("AI call failed:", err)
    return fallbackClassification(title, description)
  }

  try {
    const jsonString = extractJSON(raw)
    if (!jsonString) throw new Error("No JSON in response")

    const parsed = ClassificationSchema.parse(JSON.parse(jsonString))

    if (parsed.confidence < AI_CONFIDENCE_THRESHOLD) {
      return fallbackClassification(title, description)
    }

    return parsed
  } catch {
    console.warn("Invalid AI response:", raw)
    return fallbackClassification(title, description)
  }
}