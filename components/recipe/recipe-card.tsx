import React from "react"
import Image from "next/image"
import Link from "next/link"

import { Recipe } from "@/types/data"

import { TypographyLarge, TypographyMuted } from "../ui/typography"

export default function RecipeCard({
  recipe,
  animationDelay,
}: {
  recipe: Recipe
  animationDelay: number
}) {
  return (
    <Link href={`/recipes/${recipe.slug}`}>
      <div
        className="space-y-3"
        style={{ animationDelay: `${animationDelay}ms` }}
      >
        <div className="overflow-hidden rounded-md aspect-square relative">
          <Image
            src={recipe.picture_url || "./recipePlaceholder.svg"}
            alt={recipe.name}
            fill
            className="object-cover bg-muted"
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
