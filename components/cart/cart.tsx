import { createServerSupabaseClient } from "@/lib/supabase-server-client"

import CartProvider from "./cart-provider"

async function getCart() {
  const { data, error } = await createServerSupabaseClient()
    .from("cart_recipe")
    .select("quantity,recipe(id,name)")

  return data
}

export type Cart = Awaited<ReturnType<typeof getCart>>

export async function Cart({ children }: { children: React.ReactNode }) {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase.auth.getSession()

  if (!data.session) return <>{children}</>

  const cart = await getCart()

  return <CartProvider cart={cart}>{children}</CartProvider>
}
