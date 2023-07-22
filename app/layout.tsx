import { Inter } from "next/font/google"

import { ThemeProvider } from "@/components/theme-provider"

import "./globals.css"
import { Suspense } from "react"
import { Analytics } from "@vercel/analytics/react"

import { Toaster } from "@/components/ui/toaster"
import { Cart } from "@/components/cart/cart"
import { Fridge } from "@/components/fridge/fridge"
import { SiteHeader } from "@/components/layout/site-header"

import SupabaseProvider from "./supabase-provider"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata = {
  title: "Fridge",
  description: "Find your next meal",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
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
          <ThemeProvider attribute="class" defaultTheme="light">
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader />
              <Suspense>
                <div className="flex-1">{children}</div>
              </Suspense>
              <Analytics />
            </div>
            <Toaster />
          </ThemeProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}
