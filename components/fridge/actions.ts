"use server"

import { createServerSupabaseClient } from "@/lib/supabase-server-client"

export async function addItemToFridge(props: {
  ingredient_id: string
  quantity: number
  unit: string
  user_id: string
}) {
  const supabase = createServerSupabaseClient()
  return supabase.from("fridge").insert(props)
}

export async function removeItemFromFridge(props: {
  ingredient_id: string
  user_id: string
}) {
  const supabase = createServerSupabaseClient()
  return supabase
    .from("fridge")
    .delete()
    .eq("user_id", props.user_id)
    .eq("ingredient_id", props.ingredient_id)
}

export async function updateFridgeItemQuantity(props: {
  ingredient_id: string
  quantity: number
  unit: string
  user_id: string
}) {
  const supabase = createServerSupabaseClient()
  return supabase.from("fridge").upsert(props)
}
