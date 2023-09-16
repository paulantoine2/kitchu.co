"use client"

import {
  TransitionStartFunction,
  createContext,
  useContext,
  useState,
  useTransition,
} from "react"
import { useRouter } from "next/navigation"

import { FridgeIngredient } from "@/types/data"
import { useSupabase } from "@/app/supabase-provider"

import {
  addItemToFridge,
  clearFridge,
  removeItemFromFridge,
  updateFridgeItem,
} from "../../components/fridge/actions"
import { Fridge } from "./fridge"

type FridgeContext = {
  fridge: Fridge
  fridgeIsUpdating: boolean
  startFridgeTransition: TransitionStartFunction
  addItemToFridge: (
    ingredient_id: number,
    quantity: number,
    unit: number
  ) => void
  removeItemFromFridge: (ingredient_id: number) => void
  updateFridgeItem: (
    ingredient_id: number,
    updates: { quantity?: number; unit?: number }
  ) => void
  clearFridge: () => void
}

const Context = createContext<FridgeContext>({
  fridge: null,
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

  function add(ingredient_id: number, quantity: number, unit_id: number) {
    startFridgeTransition(async () => {
      if (!user_id) return
      const { error } = await addItemToFridge({
        ingredient_id,
        quantity,
        unit_id,
        user_id,
      })
      if (error) return handleError(error.message)

      router.refresh()
    })
  }

  function remove(ingredient_id: number) {
    startFridgeTransition(async () => {
      if (!user_id) return
      const { error } = await removeItemFromFridge({
        ingredient_id,
        user_id,
      })
      if (error) return handleError(error.message)

      router.refresh()
    })
  }

  function update(
    ingredient_id: number,
    updates: { quantity?: number; unit?: number }
  ) {
    startFridgeTransition(async () => {
      if (!user_id) return
      const { error } = await updateFridgeItem({
        ingredient_id,
        updates,
        user_id,
      })
      if (error) return handleError(error.message)

      router.refresh()
    })
  }

  function clear() {
    startFridgeTransition(async () => {
      if (!user_id) return
      const { error } = await clearFridge({
        user_id,
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
