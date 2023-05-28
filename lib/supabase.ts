import { createClient } from "@supabase/supabase-js"

import { Database } from "./database.types"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
export const supabase = createClient<Database>(supabaseUrl, supabaseKey)

export async function searchRecipes({
  searchValue,
  category,
}: {
  searchValue: string
  category?: string
}) {
  let req = supabase.from("recipe").select("*")
  if (category) req = req.eq("category", category)

  if (searchValue)
    req = req.textSearch("name", searchValue, {
      type: "websearch",
    })

  return await req
}

type RecipesResponse = Awaited<ReturnType<typeof searchRecipes>>
export type Recipes = RecipesResponse["data"]

export async function getAllIngredients() {
  return await supabase.from("ingredient").select("*")
}

export async function getRecipe(id: string) {
  return await supabase.from("recipe").select().eq("id", id)
}

export async function getFullRecipe(id: string) {
  return await supabase
    .from("recipe")
    .select(
      `
        *,
        tag (
          name
        ),
        cuisine (
          name
        )
      `
    )
    .eq("id", id)
    .single()
}

export async function getRecipeYields(id: string) {
  return await supabase
    .from("quantity")
    .select("amount,unit,ingredient(id,name)")
    .eq("recipe_id", id)
}
