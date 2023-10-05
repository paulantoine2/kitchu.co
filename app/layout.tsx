import { Inter } from "next/font/google"

import "./globals.css"
import { Metadata } from "next"

import { cn } from "@/lib/utils"

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
    <html lang="en" className={cn(inter.variable)}>
      <body>
        <SupabaseProvider>{children}</SupabaseProvider>
      </body>
    </html>
  )
}
