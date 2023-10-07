import { Analytics } from "@vercel/analytics/react"

import { Toaster } from "@/components/ui/toaster"
import { Cart } from "@/components/cart/cart"
import { Fridge } from "@/components/fridge/fridge"
import { SiteHeader } from "@/components/layout/site-header"

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Fridge>
      <Cart>
        <div className="relative flex min-h-screen flex-col">
          <SiteHeader />
          <div className="flex-1">{children}</div>
          <Analytics />
        </div>
        <Toaster />
      </Cart>
    </Fridge>
  )
}
