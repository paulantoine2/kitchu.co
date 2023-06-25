import {
  SupabaseClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs"

import { Database } from "./database.types"

export async function searchRecipes(
  supabase: SupabaseClient,
  {
    searchValue,
    tag,
    cuisine,
    ingredient,
  }: {
    searchValue: string
    cuisine?: string
    tag?: string
    ingredient?: string
  }
) {
  let req = supabase
    .from("recipe")
    .select(`*,tag!inner(*),cuisine!inner(*),ingredient!inner(*)`)

  if (searchValue)
    req = req.textSearch("name", searchValue, {
      type: "websearch",
    })

  if (cuisine) req = req.in("cuisine.id", cuisine.split(","))
  if (tag) req = req.in("tag.id", tag.split(","))
  if (ingredient) req = req.in("ingredient.id", ingredient.split(","))

  return await req
}

export async function getMarketSalespoints(supabase: SupabaseClient<Database>) {
  return await supabase.from("market_chain").select("*,market_salepoint(*)")
}

export async function getAllIngredients(supabase: SupabaseClient<Database>) {
  return await supabase
    .from("ingredient")
    .select("*")
    .order("name", { ascending: true })
}

export async function getAllTags(supabase: SupabaseClient<Database>) {
  return await supabase
    .from("tag")
    .select("*")
    .order("name", { ascending: true })
}

export async function getAllCuisines(supabase: SupabaseClient<Database>) {
  return await supabase
    .from("cuisine")
    .select("*")
    .order("name", { ascending: true })
}

export async function getRecipe(
  supabase: SupabaseClient<Database>,
  { id }: { id: string }
) {
  return await supabase.from("recipe").select().eq("id", id)
}

export async function getFullRecipe(
  supabase: SupabaseClient<Database>,
  { id }: { id: string }
) {
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

export async function getRecipeYields(
  supabase: SupabaseClient<Database>,
  { id }: { id: string }
) {
  return await supabase
    .from("quantity")
    .select("amount,unit,ingredient(id,name)")
    .eq("recipe_id", id)
}

export async function getRecipePrice(
  supabase: SupabaseClient<Database>,
  { id, salepoint_id }: { id: string; salepoint_id?: number }
) {
  return await supabase
    .from("quantity")
    .select(
      "amount,unit,ingredient(id,name,market_product(*,market_product_price!inner(*)))"
    )
    .eq("recipe_id", id)
    .eq(
      "ingredient.market_product.market_product_price.salepoint_id",
      salepoint_id
    )
}

export async function getUser(supabase: SupabaseClient<Database>) {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    return user
  } catch (error) {
    console.error("Error:", error)
    return null
  }
}

export async function getSession(supabase: SupabaseClient<Database>) {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    return session
  } catch (error) {
    console.error("Error:", error)
    return null
  }
}
