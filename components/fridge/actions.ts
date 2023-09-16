"use server"

import { createServerSupabaseClient } from "@/lib/supabase-server-client"

export async function addItemToFridge(props: {
  ingredient_id: number
  quantity: number
  unit_id: number
  user_id: string
}) {
  const supabase = createServerSupabaseClient()
  return supabase.from("fridge_ingredient").insert(props)
}

export async function removeItemFromFridge(props: {
  ingredient_id: number
  user_id: string
}) {
  const supabase = createServerSupabaseClient()
  return supabase
    .from("fridge_ingredient")
    .delete()
    .eq("user_id", props.user_id)
    .eq("ingredient_id", props.ingredient_id)
}

export async function updateFridgeItem(props: {
  ingredient_id: number
  user_id: string
  updates: { quantity?: number; unit_id?: number }
}) {
  const supabase = createServerSupabaseClient()
  const res = await supabase
    .from("fridge_ingredient")
    .update(props.updates)
    .eq("user_id", props.user_id)
    .eq("ingredient_id", props.ingredient_id)
    .select()
  return res
}

export async function clearFridge(props: { user_id: string }) {
  const supabase = createServerSupabaseClient()
  const res = await supabase
    .from("fridge_ingredient")
    .delete()
    .eq("user_id", props.user_id)

  return res
}
