"use server"

import { createServerSupabaseClient } from "@/lib/supabase-server-client"

export async function addItemToCart(props: {
  quantity: number
  recipe_id: number
  user_id: string
}) {
  const supabase = createServerSupabaseClient()
  return supabase.from("cart_recipe").insert(props)
}

export async function removeItemFromCart(props: {
  recipe_id: number
  user_id: string
}) {
  const supabase = createServerSupabaseClient()
  return supabase
    .from("cart_recipe")
    .delete()
    .eq("user_id", props.user_id)
    .eq("recipe_id", props.recipe_id)
}

export async function updateCartItem(props: {
  recipe_id: number
  updates: { quantity: number }
  user_id: string
}) {
  const supabase = createServerSupabaseClient()
  const res = await supabase
    .from("cart_recipe")
    .update(props.updates)
    .eq("user_id", props.user_id)
    .eq("recipe_id", props.recipe_id)
    .select()
  return res
}

export async function clearCart(props: { user_id: string }) {
  const supabase = createServerSupabaseClient()
  const res = await supabase
    .from("cart_recipe")
    .delete()
    .eq("user_id", props.user_id)

  return res
}
