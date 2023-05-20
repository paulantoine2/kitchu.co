import { Inter } from "next/font/google"

import { ThemeProvider } from "@/components/theme-provider"

import "./globals.css"
import { SiteHeader } from "@/components/site-header"

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
        <ThemeProvider attribute="class" enableSystem defaultTheme="system">
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <div className="flex-1">{children}</div>
            {/* <SiteFooter /> */}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
