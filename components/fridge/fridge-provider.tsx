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
  addItemToFridge,
  clearFridge,
  removeItemFromFridge,
  updateFridgeItem,
} from "./actions"

type FridgeItem = {
  quantity: number
  unit: string
  ingredient: {
    category: string
    id: string
    name: string
  } | null
}

type Fridge = {
  id?: string
  items: FridgeItem[]
}

type FridgeContext = {
  fridge: Fridge
  fridgeIsUpdating: boolean
  startFridgeTransition: TransitionStartFunction
  addItemToFridge: (
    ingredient_id: string,
    quantity: number,
    unit: string
  ) => void
  removeItemFromFridge: (item: FridgeItem) => void
  updateFridgeItem: (
    item: FridgeItem,
    updates: { quantity?: number; unit?: string }
  ) => void
  clearFridge: () => void
}

const Context = createContext<FridgeContext>({
  fridge: { items: [] },
  fridgeIsUpdating: false,
  startFridgeTransition: () => {},
  addItemToFridge: () => {},
  removeItemFromFridge: () => {},
  updateFridgeItem: () => {},
  clearFridge: () => {},
})

export default function FridgeProvider({
  children,
  fridge,
}: {
  children: React.ReactNode
  fridge: Fridge
}) {
  const { session, supabase } = useSupabase()
  const [fridgeIsUpdating, startFridgeTransition] = useTransition()
  const router = useRouter()

  const user_id = session?.user.id

  function handleError(message: string) {
    alert(message)
  }

  function add(ingredient_id: string, quantity: number, unit: string) {
    startFridgeTransition(async () => {
      if (!user_id) return
      const { error } = await addItemToFridge({
        ingredient_id: ingredient_id,
        quantity: quantity,
        unit: unit,
        user_id: user_id,
      })
      if (error) return handleError(error.message)

      router.refresh()
    })
  }

  function remove(item: FridgeItem) {
    startFridgeTransition(async () => {
      if (!item.ingredient || !user_id) return
      const { error } = await removeItemFromFridge({
        ingredient_id: item.ingredient.id,
        user_id: user_id,
      })
      if (error) return handleError(error.message)

      router.refresh()
    })
  }

  function update(
    item: FridgeItem,
    updates: { quantity?: number; unit?: string }
  ) {
    startFridgeTransition(async () => {
      if (!item.ingredient || !user_id) return
      const { error } = await updateFridgeItem({
        ingredient_id: item.ingredient.id,
        updates,
        user_id: user_id,
      })
      if (error) return handleError(error.message)

      router.refresh()
    })
  }

  function clear() {
    startFridgeTransition(async () => {
      if (!user_id) return
      const { error } = await clearFridge({
        user_id: user_id,
      })
      if (error) return handleError(error.message)

      router.refresh()
    })
  }

  return (
    <Context.Provider
      value={{
        fridge,
        fridgeIsUpdating,
        startFridgeTransition,
        addItemToFridge: add,
        updateFridgeItem: update,
        removeItemFromFridge: remove,
        clearFridge: clear,
      }}
    >
      <>{children}</>
    </Context.Provider>
  )
}

export const useFridge = () => {
  const context = useContext(Context)
  return context
}
