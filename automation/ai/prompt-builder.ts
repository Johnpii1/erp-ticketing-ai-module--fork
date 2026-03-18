export function buildClassificationPrompt(params: {
  title: string
  description: string
  context?: string
}) {
  return `
You are an AI system that classifies ERP SAV support tickets.

Think step-by-step internally before answering, but output ONLY the final JSON.

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
general = question, guidance, minor issue

Priority guidelines:
high = system outage or blocking issue
medium = important issue but system still usable
low = minor issue, question, cosmetic problem, feature request

Output JSON format:
{
  "priority": "high | medium | low",
  "category": "incident | billing | technical | feature | general",
  "confidence": number between 0 and 1
}

Rules:
- Choose only ONE category.
- Confidence must be between 0 and 1 with maximum two decimals.
- If the ticket contains words like "urgent", "asap", or "immediately", set priority to "high".
- If category is unclear, choose "general".

Historical SAV examples:
${params.context ?? "No relevant historical tickets."}

Ticket:
Title: ${params.title}
Description: ${params.description}

Return ONLY the JSON object.
`
}