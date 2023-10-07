"use client"

import React from "react"
import Image, { ImageProps } from "next/image"

export function RecipeImage({
  recipe,
  ...props
}: { recipe: { name: string; id: number; picture_url?: string | null } } & Omit<
  ImageProps,
  "src" | "alt"
>) {
  const src = recipe.picture_url || "/recipePlaceholder.svg"
  return <Image {...props} src={src} alt={recipe.name} />
}
