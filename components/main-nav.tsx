"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

import { StoreSelectorDialog } from "./layout/store-selector"

export function MainNav() {
  const pathname = usePathname()

  return (
    <React.Fragment>
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
