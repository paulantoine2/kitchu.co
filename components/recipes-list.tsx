import Image from "next/image"

import { Recipe } from "@/types/data"
import { Recipes } from "@/lib/supabase"

export function RecipesList({ recipes }: { recipes: Recipes }) {
  if (recipes === null) return null

  return (
    <>
      {recipes.map((r, index) => (
        <div className="space-y-3 transition-all animate-fade-in" key={r.id}>
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
            <p className="text-sm text-muted-foreground capitalize">
              {r.category}
            </p>
          </div>
        </div>
      ))}
    </>
  )
}
