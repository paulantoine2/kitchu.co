import { supabase } from "@/lib/supabase"

import RecipeCard from "./recipe/recipe-card"

type Props = {
  searchValue: string
  ingredient?: string
  limit?: number
}

export async function RecipesList({ searchValue, ingredient, limit }: Props) {
  let req = supabase.from("recipe").select(`*,ingredient!inner(*)`)

  if (searchValue)
    req = req.textSearch("name", searchValue, {
      type: "websearch",
    })

  if (ingredient) req = req.in("ingredient.id", ingredient.split(","))
  if (limit) req = req.limit(limit)

  const { data: recipes, error } = await req

  if (!recipes || !recipes.length) return <p>Pas de résultats</p>

  const id = new Date().toISOString()

  return (
    <>
      {recipes?.map((r, index) => (
        <RecipeCard key={r.id + id} animationDelay={index * 25} recipe={r} />
      ))}
    </>
  )
}
