import Link from "next/link"

import { Logo } from "../common/logo"
import { Button } from "../ui/button"
import Search from "./search"

export async function SiteHeader() {
  const { data, error } = await supabase
    .from("market_chain")
    .select("*,market_salepoint(*)")

  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full border-b bg-background/60 shadow-sm backdrop-blur max-sm:hidden">
      <div className="container grid grid-cols-6 h-16 items-center justify-between">
        <nav className="flex items-center space-x-6">
          <Link href="/" title="Accueil">
            <Logo height="22" />
          </Link>
        </nav>
        <Search redirectToPathname="/recipes" />
        <div className="flex justify-end">
          <Button size="sm" variant="secondary" asChild>
            <Link href="/">S&apos;inscrire</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
