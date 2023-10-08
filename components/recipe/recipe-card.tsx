import React, { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"

import { Recipe } from "@/types/data"

import { RecipePrice } from "../recipe-price"
import { Skeleton } from "../ui/skeleton"
import {
  TypographyH3,
  TypographyH4,
  TypographyLarge,
  TypographyLead,
  TypographyMuted,
} from "../ui/typography"

export default function RecipeCard({
  recipe,
  animationDelay,
}: {
  recipe: Recipe
  animationDelay: number
}) {
  return (
    <Link href={`/recipes/${recipe.id}`}>
      <div
        className="space-y-3 transition-all animate-fade-in opacity-0"
        style={{ animationDelay: `${animationDelay}ms` }}
      >
        <div className="overflow-hidden rounded-md aspect-square relative">
          <Image
            src={recipe.picture_url || "./recipePlaceholder.svg"}
            alt={recipe.name}
            fill
            className="object-cover bg-muted"
            quality={25}
          />
        </div>
        <div className="space-y-1">
          <TypographyLarge className="line-clamp-2">
            {recipe.name}
          </TypographyLarge>
          <TypographyMuted>{recipe.prep_time_min} min</TypographyMuted>
        </div>
      </div>
    </Link>
  )
}
