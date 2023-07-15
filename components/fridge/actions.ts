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

export async function updateFridgeItem(props: {
  ingredient_id: string
  updates: { quantity?: number; unit?: string }
  user_id: string
}) {
  const supabase = createServerSupabaseClient()
  const res = await supabase
    .from("fridge")
    .update(props.updates)
    .eq("user_id", props.user_id)
    .eq("ingredient_id", props.ingredient_id)
    .select()
  return res
}

export async function clearFridge(props: { user_id: string }) {
  const supabase = createServerSupabaseClient()
  const res = await supabase
    .from("fridge")
    .delete()
    .match({ user_id: props.user_id })
    .eq("user_id", props.user_id)

  return res
}
