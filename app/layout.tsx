import { Inter } from "next/font/google"

import { ThemeProvider } from "@/components/theme-provider"

import "./globals.css"
import { Suspense } from "react"
import { Metadata } from "next"
import { Analytics } from "@vercel/analytics/react"

import { Toaster } from "@/components/ui/toaster"
import { Cart } from "@/components/cart/cart"
import { Fridge } from "@/components/fridge/fridge"
import { SiteHeader } from "@/components/layout/site-header"

import SupabaseProvider from "./supabase-provider"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: "Kitchu",
  verification: {
    google: "DycCTMA2fAoHLPsWpbYWaNP_Ha-7adVhJz3WEpgoHNo",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <SupabaseProvider>
          <div className="relative flex min-h-screen flex-col">
            <div className="flex-1">{children}</div>
            <Analytics />
          </div>
          <Toaster />
        </SupabaseProvider>
      </body>
    </html>
  )
}
