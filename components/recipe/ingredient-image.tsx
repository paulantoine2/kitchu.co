"use client"

import React from "react"
import Image, { ImageProps } from "next/image"

export function IngredientImage({
  ingredient,
  ...props
}: { ingredient: { name: string; id: number } } & Omit<
  ImageProps,
  "src" | "alt"
>) {
  const [src, setSrc] = React.useState(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/ingredient/${ingredient.id}.png`
  )
  return (
    <Image
      {...props}
      src={src}
      alt={ingredient.name}
      onError={() => setSrc("/ingredientPlaceholder.svg")}
    />
  )
}
