"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"

import { useSupabase } from "@/app/supabase-provider"

import { Icons } from "../icons"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { addItemToFridge } from "./actions"
import { useFridge } from "./fridge-provider"

type Props = {
  ingredient: {
    id: string
    name: string
  }
  defaultAmount: number
  unit: string
}

export function AddToFridge({ ingredient, unit, defaultAmount }: Props) {
  const {
    addItemToFridge,
    fridgeIsUpdating,
    updateFridgeItem,
    fridge,
    removeItemFromFridge,
  } = useFridge()

  const item = fridge.items.find(
    (item) => item.ingredient?.id === ingredient.id
  )

  if (item)
    return (
      <div className="flex space-x-2">
        <Input
          value={item.quantity}
          className="w-[60px] h-[32px] text-center p-0 px-2 "
          disabled={fridgeIsUpdating}
          type="number"
          onChange={(e) =>
            updateFridgeItem(item, {
              quantity: +e.target.value,
            })
          }
        />
        <Select value="pce">
          <SelectTrigger className="w-[80px] h-8">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="g">g</SelectItem>
              <SelectItem value="pce">pièce</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button
          variant="ghost"
          className="p-2 h-[32px]"
          onClick={() => removeItemFromFridge(item)}
        >
          <Icons.trash className="w-4 h-4" />
        </Button>
      </div>
    )
  return (
    <Button
      variant="secondary"
      onClick={() => {
        addItemToFridge(ingredient.id, defaultAmount, unit)
      }}
      disabled={fridgeIsUpdating}
    >
      {fridgeIsUpdating ? (
        <Icons.spinner className="h-4 w-4 animate-spin" />
      ) : (
        <Icons.fridge className="h-4 w-4" />
      )}
    </Button>
  )
}
