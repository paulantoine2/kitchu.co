import Image from "next/image"
import Link from "next/link"

import { Recipe } from "@/types/data"
import { Recipes } from "@/lib/supabase"

export function RecipesList({ recipes }: { recipes: Recipes }) {
  if (recipes === null) return null

  return (
    <>
      {recipes.map((r, index) => (
        <Link href={`/recipes/${r.id}`} key={r.id}>
          <div
            className="space-y-3 transition-all animate-fade-in opacity-0"
            style={{ animationDelay: `${index * 25}ms` }}
          >
            <div className="overflow-hidden rounded-md aspect-square relative">
              <Image
                src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/recipe/${r.id}.png`}
                alt={r.name}
                fill
                className="object-cover bg-muted"
                quality={25}
              />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-medium truncate">{r.name}</h3>
              <p className="text-sm text-muted-foreground">{r.headline}</p>
            </div>
          </div>
        </Link>
      ))}
    </>
  )
}
