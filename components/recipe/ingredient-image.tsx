"use client"

import React from "react"
import Image, { ImageProps } from "next/image"

export function IngredientImage({
  ingredient,
  ...props
}: { ingredient: { name: string; id: number; picture_url?: string } } & Omit<
  ImageProps,
  "src" | "alt"
>) {
  return (
    <Image
      {...props}
      src={ingredient.picture_url || "/ingredientPlaceholder.svg"}
      alt={ingredient.name}
    />
  )
}
