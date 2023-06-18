"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

import { StoreSelectorDialog } from "./layout/store-selector"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="mr-4 hidden md:flex">
      <nav className="flex items-center space-x-6 text-sm font-medium">
        <StoreSelectorDialog />
        <Link
          href="/"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/" ? "text-foreground" : "text-foreground/60"
          )}
        >
          Home
        </Link>
        <Link
          href="/recipes"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/recipes" ? "text-foreground" : "text-foreground/60"
          )}
        >
          Recipes
        </Link>
        <Link
          href="/ingredients"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/ingredients"
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Ingredients
        </Link>
      </nav>
    </div>
  )
}
