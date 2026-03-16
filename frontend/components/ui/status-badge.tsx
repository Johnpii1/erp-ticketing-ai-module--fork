export default function StatusBadge({ value }: { value?: string }) {

  const styles: Record<string, string> = {
    open: "bg-blue-100 text-blue-700",
    pending: "bg-yellow-100 text-yellow-700",
    resolved: "bg-green-100 text-green-700",
    closed: "bg-gray-200 text-gray-700"
  }

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
      ${styles[value ?? ""] || "bg-muted text-muted-foreground"}`}
    >
      {value ?? "—"}
    </span>
  )
}