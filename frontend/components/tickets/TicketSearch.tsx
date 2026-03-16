"use client"

import { Search } from "lucide-react"

export default function TicketSearch({
  value,
  onChange
}: {
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="relative">

      <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search tickets..."
        className="w-full rounded-md border pl-9 pr-3 py-2 text-sm"
      />

    </div>
  )
}