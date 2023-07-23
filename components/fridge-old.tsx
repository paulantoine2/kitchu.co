"use client"

import { FormEvent, useRef, useState } from "react"
import Image from "next/image"

import { Ingredient } from "@/types/data"
import { cn } from "@/lib/utils"
import { FridgeActionKind, useFridge } from "@/hooks/useFridge"

import { Icons } from "./icons"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip"

type Props = { ingredients: Ingredient[] }

export function Fridge({ ingredients }: Props) {
  const [state, dispatch] = useFridge()
  const [filter, setFilter] = useState("")

  const selectedCount = Object.keys(state.fridge).length
  return (
    <div className="flex flex-col items-center">
      <Input
        className="w-[400px]"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter les ingrédients..."
      />

      <div className="flex overflow-x-scroll py-4 w-[800px]">
        {ingredients
          .filter((i) => i.name.toLowerCase().includes(filter.toLowerCase()))
          .map((i) => (
            <IngredientItem
              quantity={state.fridge[i.id]?.quantity}
              unit={state.fridge[i.id]?.unit}
              onSet={(quantity, unit) => {
                dispatch({
                  type: FridgeActionKind.SET_INGREDIENT,
                  payload: { id: i.id, quantity, unit },
                })
              }}
              key={i.id}
              ingredient={i}
            />
          ))}
      </div>
      <p className="text-sm text-muted-foreground mb-2">
        {selectedCount} Ingrédient(s) séléctionné(s)
      </p>
      <Button size="lg" disabled={!selectedCount}>
        Trouver des recettes <Icons.right className="ml-2 h-4 w-4" />
      </Button>
    </div>
  )
}

type ItemProps = {
  ingredient: Ingredient
  quantity?: number
  unit?: string
  onSet: (quantity: number, unit: string) => void
}

export function IngredientItem(props: ItemProps) {
  const { quantity, unit, ingredient, onSet } = props
  const [open, setOpen] = useState(false)
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger onClick={() => setOpen(true)}>
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="relative">
                {quantity && unit && (
                  <Badge variant="cuisine" className="absolute z-10">
                    {`${quantity}${unit}`}
                  </Badge>
                )}
                <div
                  className={cn(
                    `overflow-hidden rounded-full aspect-square relative w-20 h-20 p-2 cursor-pointer hover:bg-muted`
                  )}
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/ingredient/${ingredient.id}.png`}
                    alt={ingredient.name}
                    width={100}
                    height={100}
                    className="object-cover"
                    placeholder="empty"
                  />
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{ingredient.name}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </PopoverTrigger>
      <PopoverContent>
        <IngredientItemForm
          {...props}
          onSet={(quantity, unit) => {
            setOpen(false)
            onSet(quantity, unit)
          }}
        />
      </PopoverContent>
    </Popover>
  )
}

function IngredientItemForm({ ingredient, quantity, unit, onSet }: ItemProps) {
  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      quantity: { value: number }
      unit: { value: string }
    }
    onSet(+target.quantity.value, target.unit.value)
  }
  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-4 gap-2">
      <Input
        name="quantity"
        type="number"
        defaultValue={quantity || 0}
        className="col-span-2"
      />
      <Select name="unit" defaultValue={unit || "g"}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="g">g</SelectItem>
        </SelectContent>
      </Select>
      <Button type="submit" variant="outline">
        <Icons.check />
      </Button>
    </form>
  )
}
