import { Inter } from "next/font/google"

import { ThemeProvider } from "@/components/theme-provider"

import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { SiteHeader } from "@/components/site-header"

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
              {/* @ts-expect-error Async Server Component */}
              <SiteHeader />
              <div className="flex-1">{children}</div>
              {/* <SiteFooter /> */}
            </div>
            <Toaster />
          </ThemeProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}
