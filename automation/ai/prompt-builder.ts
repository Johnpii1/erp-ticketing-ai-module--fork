export function buildClassificationPrompt(params: {
  title: string
  description: string
  context?: string
}) {
  return `Classify this support ticket as JSON only. No explanation.

{"priority":"high|medium|low","category":"incident|billing|technical|feature|general","confidence":0.0-1.0}

${params.context ? `Context:\n${params.context}\n` : ""}Ticket: ${params.title} — ${params.description}`
}