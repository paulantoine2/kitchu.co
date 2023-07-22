import { createServerSupabaseClient } from "@/lib/supabase-server-client"

import CartProvider from "./cart-provider"

export async function Cart({ children }: { children: React.ReactNode }) {
  const supabase = createServerSupabaseClient()
  const session = await supabase.auth.getSession()

  const user_id = session.data.session?.user.id

  if (!user_id) return null

  const { data, error } = await supabase
    .from("cart_recipe")
    .select("persons,recipe(*)")
    .eq("user_id", user_id)

  return (
    <CartProvider cart={data ? { id: user_id, items: data } : { items: [] }}>
      {children}
    </CartProvider>
  )
}
