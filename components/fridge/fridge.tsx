import { createServerSupabaseClient } from "@/lib/supabase-server-client"

import FridgeModal from "./fridge-modal"

export async function Fridge() {
  const supabase = createServerSupabaseClient()
  const session = await supabase.auth.getSession()

  if (!session.data) return null

  const { data, error } = await supabase
    .from("fridge")
    .select("quantity,unit,ingredient(*)")
    .eq("user_id", session.data.session?.user.id)

  return <FridgeModal items={data || []} />
}
