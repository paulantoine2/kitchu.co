import { createClient } from "@supabase/supabase-js"

import { Database } from "./database.types"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
export const supabase = createClient<Database>(supabaseUrl, supabaseKey)

export async function searchRecipes(searchValue: string) {
  const req = supabase.from("recipe").select()
  if (searchValue) req.textSearch("name", searchValue)

  return await req
}

type RecipesResponse = Awaited<ReturnType<typeof searchRecipes>>
export type Recipes = RecipesResponse["data"]
