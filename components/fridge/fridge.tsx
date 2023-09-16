import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import { FridgeIngredient } from "@/types/data"
import { Database } from "@/lib/database.types"
import { createServerSupabaseClient } from "@/lib/supabase-server-client"

import FridgeModal from "./fridge-modal"
import FridgeProvider from "./fridge-provider"

async function getFridge(user_id: string) {
  const { data, error } = await createServerSupabaseClient()
    .from("fridge_ingredient")
    .select("quantity,unit(*),ingredient(*)")
    .eq("user_id", user_id)
    .order("ingredient_id")

  return data
}

export type Fridge = Awaited<ReturnType<typeof getFridge>>

export async function Fridge({ children }: { children: React.ReactNode }) {
  const session = await createServerSupabaseClient().auth.getSession()
  const user_id = session.data.session?.user.id

  if (!user_id) return <>{children}</>

  const data = await getFridge(user_id)

  return <FridgeProvider fridge={data}>{children}</FridgeProvider>
}
