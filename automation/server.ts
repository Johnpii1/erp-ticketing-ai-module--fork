import express from "express"
import { classifyTicket } from "./ai/classifier"
import {
  getExecutionLogs,
  getAILatencyStats,
  getErrorStats,
  getFallbackStats,
} from "./ai/monitoring"
import "dotenv/config"

export const app = express()
app.use(express.json())

app.post("/automation/classify", async (req, res) => {
  const { title, description, ticketId } = req.body

  if (!title || !description) {
    return res.status(400).json({ error: "title and description are required" })
  }

  try {
    const result = await classifyTicket(title, description)
    res.json(result)
  } catch (error) {
    console.error("Classification error:", error)
    res.status(500).json({ error: "classification_failed" })
  }
})

app.get("/monitoring/execution/:executionId", async (req, res) => {
  try {
    const logs = await getExecutionLogs(req.params.executionId)
    res.json({
      executionId: req.params.executionId,
      logs,
      summary: {
        total_events: logs.length,
        success_count: logs.filter((l: any) => l.status === "success").length,
        error_count: logs.filter((l: any) => l.status === "error").length,
      },
    })
  } catch {
    res.status(500).json({ error: "Failed to fetch logs" })
  }
})

app.get("/monitoring/latency", async (req, res) => {
  try {
    const hours = Number(req.query.hours) || 24
    const ticketId = req.query.ticketId as string | undefined
    res.json({
      period_hours: hours,
      ticketId: ticketId ?? "all",
      metrics: await getAILatencyStats(ticketId, hours),
    })
  } catch {
    res.status(500).json({ error: "Failed to fetch latency stats" })
  }
})

app.get("/monitoring/errors", async (req, res) => {
  try {
    const hours = Number(req.query.hours) || 24
    res.json({ period_hours: hours, errors: await getErrorStats(hours) })
  } catch {
    res.status(500).json({ error: "Failed to fetch error stats" })
  }
})

app.get("/monitoring/fallbacks", async (req, res) => {
  try {
    const hours = Number(req.query.hours) || 24
    res.json({ period_hours: hours, fallbacks: await getFallbackStats(hours) })
  } catch {
    res.status(500).json({ error: "Failed to fetch fallback stats" })
  }
})

app.get("/health", (_req, res) =>
  res.json({ status: "healthy", timestamp: new Date().toISOString() })
)

if (require.main === module) {
  const PORT = process.env.PORT ?? 3000
  app.listen(PORT, () => console.log(`API running on port ${PORT}`))
}