"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Session, User } from "@supabase/supabase-js"

import { cn } from "@/lib/utils"

import { Icons } from "./icons"
import { StoreSelectorDialog } from "./layout/store-selector"
import { Button } from "./ui/button"

export function MainNav() {
  const pathname = usePathname()

  return (
    <React.Fragment>
      <StoreSelectorDialog />
      <Link
        href="/recipes"
        className={cn(
          "text-sm font-medium transition-colors hover:text-foreground/80",
          pathname === "/recipes" ? "text-foreground" : "text-foreground/60"
        )}
      >
        Recettes
      </Link>
      <Link
        href="/ingredients"
        className={cn(
          "text-sm font-medium transition-colors hover:text-foreground/80",
          pathname === "/ingredients" ? "text-foreground" : "text-foreground/60"
        )}
      >
        Ingrédients
      </Link>
    </React.Fragment>
  )
}
