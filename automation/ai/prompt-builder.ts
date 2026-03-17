export function buildClassificationPrompt(params: {
  title: string
  description: string
  context?: string
}) {
  return `
You are an AI system that classifies ERP SAV support tickets.

Return ONLY a valid JSON object.
The response MUST start with { and end with }.
Do NOT include explanations, comments, or markdown.

Allowed priority values:
- high
- medium
- low

Allowed category values:
- incident
- billing
- technical
- feature
- general

Category definitions:
incident = system outage, failure, blocking issue
billing = invoices, payments, taxes
technical = bug, integration problem, performance issue
feature = feature request or improvement
general = question or guidance

Output JSON format:
{
  "priority": "high | medium | low",
  "category": "incident | billing | technical | feature | general",
  "confidence": number between 0 and 1
}

Rules:
- Choose only ONE category.
- Confidence must be between 0 and 1 with max two decimals.
- If the ticket contains words like "urgent", "asap", or "immediately", set priority to "high".

Historical SAV examples:
${params.context ?? "No relevant historical tickets."}

Ticket:
Title: ${params.title}
Description: ${params.description}

Return ONLY the JSON object.
`
}