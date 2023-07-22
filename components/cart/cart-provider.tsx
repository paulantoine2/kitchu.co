"use client"

import {
  TransitionStartFunction,
  createContext,
  useContext,
  useState,
  useTransition,
} from "react"
import { useRouter } from "next/navigation"

import { useSupabase } from "../../app/supabase-provider"
import {
  addItemToCart,
  clearCart,
  removeItemFromCart,
  updateCartItem,
} from "./actions"

type CartItem = {
  persons: number
  recipe: {
    id: string
    name: string
    headline: string | null
  } | null
}

type Cart = {
  id?: string
  items: CartItem[]
}

type CartContext = {
  cart: Cart
  cartIsUpdating: boolean
  startCartTransition: TransitionStartFunction
  addItemToCart: (recipe_id: string, persons: number) => void
  removeItemFromCart: (item: CartItem) => void
  updateCartItem: (item: CartItem, updates: { persons: number }) => void
  clearCart: () => void
}

const Context = createContext<CartContext>({
  cart: { items: [] },
  cartIsUpdating: false,
  startCartTransition: () => {},
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  updateCartItem: () => {},
  clearCart: () => {},
})

export default function CartProvider({
  children,
  cart,
}: {
  children: React.ReactNode
  cart: Cart
}) {
  const { session } = useSupabase()
  const [cartIsUpdating, startCartTransition] = useTransition()
  const router = useRouter()

  const user_id = session?.user.id

  function handleError(message: string) {
    alert(message)
  }

  function add(recipe_id: string, persons: number) {
    startCartTransition(async () => {
      if (!user_id) return
      const { error } = await addItemToCart({
        recipe_id,
        persons,
        user_id,
      })
      if (error) return handleError(error.message)

      router.refresh()
    })
  }

  function remove(item: CartItem) {
    startCartTransition(async () => {
      if (!item.recipe || !user_id) return
      const { error } = await removeItemFromCart({
        recipe_id: item.recipe.id,
        user_id: user_id,
      })
      if (error) return handleError(error.message)

      router.refresh()
    })
  }

  function update(item: CartItem, updates: { persons: number }) {
    startCartTransition(async () => {
      if (!item.recipe || !user_id) return
      const { error } = await updateCartItem({
        recipe_id: item.recipe.id,
        updates,
        user_id,
      })
      if (error) return handleError(error.message)

      router.refresh()
    })
  }

  function clear() {
    startCartTransition(async () => {
      if (!user_id) return
      const { error } = await clearCart({
        user_id,
      })
      if (error) return handleError(error.message)

      router.refresh()
    })
  }

  return (
    <Context.Provider
      value={{
        cart,
        cartIsUpdating,
        startCartTransition,
        addItemToCart: add,
        updateCartItem: update,
        removeItemFromCart: remove,
        clearCart: clear,
      }}
    >
      <>{children}</>
    </Context.Provider>
  )
}

export const useCart = () => {
  const context = useContext(Context)
  return context
}
