'use client'

import { supabaseClient } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    await supabaseClient.auth.signOut()

    router.refresh()
    router.push('/login')
  }

  return (
  <Button onClick={handleLogout}>
    Logout
  </Button>
  )
}
