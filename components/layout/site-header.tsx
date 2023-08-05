import { Suspense } from "react"
import Link from "next/link"

import { supabase } from "@/lib/supabase"
import { MainNav } from "@/components/main-nav"

import CartModal from "../cart/cart-modal"
import { Logo } from "../common/logo"
import FridgeModal from "../fridge/fridge-modal"
import { StoreSelectorDialog } from "./store-selector"
import { UserNav } from "./user-nav"

export async function SiteHeader() {
  const { data, error } = await supabase
    .from("market_chain")
    .select("*,market_salepoint(*)")

  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full border-b bg-background/60 shadow-sm backdrop-blur">
      <div className="container flex h-16 items-center">
        <nav className="flex items-center space-x-6 w-full">
          <Link href="/">
            <Logo height="26" />
          </Link>

          {data && <StoreSelectorDialog market_chains={data} />}
          <MainNav />
        </nav>

        <UserNav
          Buttons={
            <Suspense>
              <FridgeModal />
              <CartModal />
            </Suspense>
          }
        />
      </div>
    </header>
  )
}
