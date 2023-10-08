import { Analytics } from "@vercel/analytics/react"

import { Toaster } from "@/components/ui/toaster"
import SiteFooter from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="relative flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <Analytics />
      </div>
      <Toaster />
    </>
  )
}
