import { Metadata } from "next"
import { Analytics } from "@vercel/analytics/react"

import { Toaster } from "@/components/ui/toaster"
import SiteFooter from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"

export const metadata: Metadata = {
  title:
    "Kitchu | La liste de courses intelligente pour préparer vos meilleures recettes",
  description:
    "Trouvez des idées de recettes, évitez le gaspillage, estimez le cout de vos repas",
  keywords:
    "courses,recettes,cuisine,régime,drive,liste,gaspi,frigo,gaspillage,ingrédients",
  twitter: {
    title: "Kitchu: La liste de courses intelligente",
    description:
      "Trouvez des idées de recettes, évitez le gaspillage, estimez le cout de vos repas",
    card: "summary_large_image",
    site: "https://www.kitchu.co/",
  },
  robots: "index, follow",
}

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
