"use client"

import React from "react"
import Image, { ImageProps } from "next/image"

export function RecipeImage({
  recipe,
  ...props
}: { recipe: { name: string; id: number } } & Omit<ImageProps, "src" | "alt">) {
  const [src, setSrc] = React.useState(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/recipe/${recipe.id}.png`
  )
  return (
    <Image
      {...props}
      src={src}
      alt={recipe.name}
      onError={() => setSrc("/recipePlaceholder.svg")}
    />
  )
}
