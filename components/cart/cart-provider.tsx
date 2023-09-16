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
import { Cart } from "./cart"

type CartContext = {
  cart: Cart
  cartIsUpdating: boolean
  startCartTransition: TransitionStartFunction
  addItemToCart: (recipe_id: number, quantity: number) => void
  removeItemFromCart: (recipe_id: number) => void
  updateCartItem: (recipe_id: number, updates: { quantity: number }) => void
  clearCart: () => void
}

const Context = createContext<CartContext>({
  cart: null,
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

  function add(recipe_id: number, quantity: number) {
    startCartTransition(async () => {
      if (!user_id) return
      const { error } = await addItemToCart({
        recipe_id,
        quantity,
        user_id,
      })
      if (error) return handleError(error.message)

      router.refresh()
    })
  }

  function remove(recipe_id: number) {
    startCartTransition(async () => {
      if (!user_id) return
      const { error } = await removeItemFromCart({
        recipe_id,
        user_id,
      })
      if (error) return handleError(error.message)

      router.refresh()
    })
  }

  function update(recipe_id: number, updates: { quantity: number }) {
    startCartTransition(async () => {
      if (!user_id) return
      const { error } = await updateCartItem({
        recipe_id,
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
