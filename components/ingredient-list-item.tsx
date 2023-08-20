import { useTransition } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

import { useSupabase } from "@/app/supabase-provider"

import { AddToFridge } from "./fridge/add-to-fridge"
import { Icons } from "./icons"
import { Button } from "./ui/button"
import { Card } from "./ui/card"

type Props = {
  ingredient: {
    id: string
    name: string
  }
  amount?: number | null
  unit?: string
  show_name?: boolean
  addToFridge?: boolean
  addToCart?: boolean
  onRemove?: () => void
}

export default function IngredientListItem({
  ingredient,
  amount,
  unit,
  show_name = true,
  addToFridge = false,
  addToCart = false,
  onRemove,
}: Props) {
  return (
    <div className=" pl-1 pr-4 space-x-3 transition-all animate-fade-in flex items-center">
      <div className="overflow-hidden rounded-full aspect-square relative w-16 h-16 p-2 ">
        <Image
          src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/ingredient/${ingredient.id}.png`}
          alt={ingredient.name}
          width={100}
          height={100}
          className="object-cover"
          placeholder="empty"
        />
      </div>
      <div className="overflow-hidden flex-1">
        {show_name && (
          <h3 className="text-sm font-medium truncate">{ingredient.name}</h3>
        )}
        {(amount || unit) && (
          <p className="text-sm text-muted-foreground">{`${amount} ${unit}`}</p>
        )}
      </div>
      {addToFridge && (
        <AddToFridge
          ingredient={ingredient}
          defaultAmount={amount || 1}
          unit={unit || "g"}
        />
      )}
      {addToCart && (
        <Button variant="secondary">
          <Icons.cart className="h-4 w-4" />
        </Button>
      )}
      {onRemove && (
        <Button onClick={onRemove} variant="secondary">
          <Icons.trash className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}
