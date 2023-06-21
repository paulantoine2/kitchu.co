import Link from "next/link"

import { getSession } from "@/lib/supabase"
import { createServerSupabaseClient } from "@/lib/supabase-server-client"
import { MainNav } from "@/components/main-nav"

import { Icons } from "./icons"
import { Button } from "./ui/button"
import { UserNav } from "./user-nav"

export async function SiteHeader() {
  const session = await getSession(createServerSupabaseClient())

  console.log(session?.user.user_metadata)

  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full border-b bg-background/60 shadow-sm backdrop-blur">
      <div className="container flex h-16 items-center">
        <MainNav session={session} />
        {session ? (
          <div className="flex items-center space-x-4">
            <Button variant="secondary" size="sm">
              <Icons.fridge className="mr-2 h-4 w-4" />
              Fridge
            </Button>
            <Button variant="secondary" size="sm">
              <Icons.cart className="mr-2 h-4 w-4" />
              Panier
            </Button>
            <UserNav session={session} />
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <Button asChild size="sm" variant="secondary">
              <Link href="/auth">
                <Icons.user className="mr-2 h-4 w-4" />
                Connexion
              </Link>
            </Button>
            <Button asChild size="sm" variant="secondary">
              <Link href="/auth">Inscription</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}
