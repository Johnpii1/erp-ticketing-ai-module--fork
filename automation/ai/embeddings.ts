import { ollama } from "./ollama-client" 
import { OLLAMA_EMBED_MODEL } from "./config"

export async function generateEmbedding(text: string): Promise<number[]> {

  const response = await ollama.embeddings({
    model: OLLAMA_EMBED_MODEL,
    prompt: text
  })

  return response.embedding as number[]
}