"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"

import { useSupabase } from "@/app/supabase-provider"

import { Icons } from "../icons"
import { Button } from "../ui/button"
import { addItemToFridge } from "./actions"

type Props = {
  ingredient: {
    id: string
    name: string
  }
  defaultAmount: number
  unit: string
}

export function AddToFridge({ ingredient, unit, defaultAmount }: Props) {
  const router = useRouter()
  const { supabase, session } = useSupabase()
  const [isPending, startTransition] = useTransition()

  return (
    <Button
      variant="secondary"
      onClick={() => {
        if (!session) return
        startTransition(async () => {
          if (!session) return
          const { error } = await addItemToFridge({
            ingredient_id: ingredient.id,
            quantity: defaultAmount,
            unit: unit,
            user_id: session.user.id,
          })
          if (error) return alert(error.message)

          router.refresh()
        })
      }}
      disabled={isPending}
    >
      {isPending ? (
        <Icons.spinner className="h-4 w-4 animate-spin" />
      ) : (
        <Icons.fridge className="h-4 w-4" />
      )}
    </Button>
  )
}
