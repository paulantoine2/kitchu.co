import Link from "next/link"

import { getSession, getUser } from "@/lib/supabase"
import { createServerSupabaseClient } from "@/lib/supabase-server-client"
import { MainNav } from "@/components/main-nav"

import { Icons } from "../icons"
import { Button } from "../ui/button"
import { UserNav } from "../user-nav"
import Cart from "./cart"
import Fridge from "./fridge"

export async function SiteHeader() {
  const user = await getUser(createServerSupabaseClient())
  const session = await getSession(createServerSupabaseClient())

  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full border-b bg-background/60 shadow-sm backdrop-blur">
      <div className="container flex h-16 items-center">
        <MainNav user={user} />
        {session ? (
          <div className="flex items-center space-x-4">
            <Fridge />
            <Cart />
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
