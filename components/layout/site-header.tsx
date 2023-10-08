import { Suspense } from "react"
import Link from "next/link"

import { supabase } from "@/lib/supabase"
import { MainNav } from "@/components/main-nav"

import CartModal from "../cart/cart-modal"
import { Logo } from "../common/logo"
import FridgeModal from "../fridge/fridge-modal"
import { Icons } from "../icons"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import Search from "./search"
import { StoreSelectorDialog } from "./store-selector"
import { UserNav } from "./user-nav"

export async function SiteHeader() {
  const { data, error } = await supabase
    .from("market_chain")
    .select("*,market_salepoint(*)")

  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full border-b bg-background/60 shadow-sm backdrop-blur">
      <div className="container grid grid-cols-3 h-16 items-center justify-between">
        <nav className="flex items-center space-x-6">
          <Link href="/">
            <Logo height="22" />
          </Link>

          {data && <StoreSelectorDialog market_chains={data} />}
          <MainNav />
        </nav>
        <Search />
        <div className="flex justify-end">
          <Button size="sm" variant="secondary">
            S&apos;inscrire
          </Button>
        </div>
      </div>
    </header>
  )
}
