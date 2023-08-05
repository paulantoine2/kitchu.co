import React, { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"

import { Icons } from "../icons"
import { RecipePrice } from "../recipe-price"
import { Skeleton } from "../ui/skeleton"
import {
  TypographyLarge,
  TypographyMuted,
  TypographySmall,
} from "../ui/typography"

export default function RecipeCard({
  recipe,
  animationDelay,
}: {
  recipe: { name: string; headline: string | null; id: string }
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
            src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/recipe/${recipe.id}.png`}
            alt={recipe.name}
            fill
            className="object-cover bg-muted"
            quality={25}
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center">
            <Suspense
              fallback={<Skeleton className="h-5 w-[100px]"></Skeleton>}
            >
              <RecipePrice persons={2} id={recipe.id} />
            </Suspense>
            <div className="h-9 w-9 bg-primary text-white rounded-full flex items-center justify-center ml-auto">
              <Icons.plus />
            </div>
          </div>
          <TypographySmall className="truncate">{recipe.name}</TypographySmall>
          <TypographyMuted className="truncate">
            {recipe.headline}
          </TypographyMuted>
        </div>
      </div>
    </Link>
  )
}
