import { cookies } from "next/headers"
import Link from "next/link"
import { redirect } from "next/navigation"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import { TypographySmall } from "@/components/ui/typography"
import { Logo } from "@/components/common/logo"
import { UserNav } from "@/components/layout/user-nav"
import { MainAdminNav } from "@/components/main-nav"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/auth")
  }

  return (
    <>
      <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full border-b bg-background/60 shadow-sm backdrop-blur">
        <div className="container flex h-16 items-center">
          <nav className="flex items-center space-x-6 w-full">
            <Link href="/admin">
              <Logo height="22" />
              <TypographySmall>Admin</TypographySmall>
            </Link>
            <MainAdminNav />
          </nav>
          <UserNav />
        </div>
      </header>
      <main className="container">{children}</main>
    </>
  )
}
