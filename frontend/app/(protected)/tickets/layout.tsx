import { redirect } from 'next/navigation'
import { createSupabaseServer } from '@/lib/supabaseServer'
import LogoutButton from '@/components/logout/logout'

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createSupabaseServer()
  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white/80 backdrop-blur">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">

          <h2 className="text-lg font-semibold tracking-tight">
            ERP Ticketing
          </h2>

          <LogoutButton />

        </div>

      </header>

      <main className="mx-auto max-w-7xl px-8 py-12 space-y-10">
        {children}
      </main>
    </div>
  )
}
