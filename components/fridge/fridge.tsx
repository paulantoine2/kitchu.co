import { createServerSupabaseClient } from "@/lib/supabase-server-client"

import FridgeModal from "./fridge-modal"
import FridgeProvider from "./fridge-provider"

export async function Fridge({ children }: { children: React.ReactNode }) {
  const supabase = createServerSupabaseClient()
  const session = await supabase.auth.getSession()

  const user_id = session.data.session?.user.id

  if (!user_id) return null

  const { data, error } = await supabase
    .from("fridge")
    .select("quantity,unit,ingredient(*)")
    .eq("user_id", user_id)
    .order("ingredient_id")

  return (
    <FridgeProvider
      fridge={data ? { id: user_id, items: data } : { items: [] }}
    >
      {children}
    </FridgeProvider>
  )
}
