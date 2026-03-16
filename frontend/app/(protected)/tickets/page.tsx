import TicketTable from '@/components/tickets/TickeTable'
import { createSupabaseServer } from '@/lib/supabaseServer'
import TicketForm from '@/components/tickets/TicketForm'
import { Ticket } from "lucide-react"

export default async function TicketsPage() {
  const supabase = await createSupabaseServer()

  const { data: tickets } = await supabase
    .from('tickets')
    .select('*')
    .order('created_at', { ascending: false })
  
  console.log(tickets)

  return (
    <div className="space-y-8">

      <div className="flex items-center gap-3">
        <Ticket className="w-6 h-6 text-primary" />

        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Tickets
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage support tickets and track issues.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
        <TicketForm />
        <TicketTable tickets={tickets || []} />
      </div>

    </div>
  )
}
