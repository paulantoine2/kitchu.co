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

export function MainAdminNav() {
  const pathname = usePathname()

  return (
    <React.Fragment>
      <Link
        href="/admin/recipes"
        className={cn(
          "text-sm font-medium transition-colors hover:text-foreground/80",
          pathname === "/admin/recipes"
            ? "text-foreground"
            : "text-foreground/60"
        )}
      >
        Recettes
      </Link>
      <Link
        href="/admin/ingredients"
        className={cn(
          "text-sm font-medium transition-colors hover:text-foreground/80",
          pathname === "/admin/ingredients"
            ? "text-foreground"
            : "text-foreground/60"
        )}
      >
        Ingrédients
      </Link>
      <Link
        href="/admin/units"
        className={cn(
          "text-sm font-medium transition-colors hover:text-foreground/80",
          pathname === "/admin/units" ? "text-foreground" : "text-foreground/60"
        )}
      >
        Unités
      </Link>
    </React.Fragment>
  )
}
