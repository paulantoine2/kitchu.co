"use client"

import { Fragment, useState, useTransition } from "react"
import { useRouter } from "next/navigation"

import { Ingredient, Quantity } from "@/types/data"
import { supabase } from "@/lib/supabase"
import { createServerSupabaseClient } from "@/lib/supabase-server-client"
import { useSupabase } from "@/app/supabase-provider"

import { useCart } from "./cart/cart-provider"
import { Icons } from "./icons"
import IngredientListItem from "./ingredient-list-item"
import { RecipePrice } from "./recipe-price"
import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { Input } from "./ui/input"
import { Separator } from "./ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip"

export function RecipeIngredientsList({
  quantity,
  recipe_id,
}: {
  quantity: (Quantity | null)[]
  recipe_id: string
}) {
  const [persons, setPersons] = useState(2)
  const { cart, cartIsUpdating, addItemToCart } = useCart()
  const { session } = useSupabase()
  const router = useRouter()

  const pending = cartIsUpdating

  const handleAddToCart = () => {
    if (session) addItemToCart(recipe_id, persons)
    else router.push("/auth")
  }

  return (
    <>
      <div className="flex items-center w-full">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setPersons((prev) => prev - 1)}
          disabled={pending}
        >
          <Icons.minus className="h-4 w-4" />
        </Button>
        <div className="flex-1 text-center">{persons} personnes</div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setPersons((prev) => prev + 1)}
          disabled={pending}
        >
          <Icons.plus className="h-4 w-4" />
        </Button>
      </div>
      <Button
        className="w-full"
        size="lg"
        disabled={pending}
        onClick={handleAddToCart}
      >
        <Icons.cart className="h-4 w-4 mr-2" />
        Ajouter au panier
      </Button>
      <p className="text-sm text-muted-foreground text-center">
        Les produits dont vous aurez besoin pour préparer cette recette seront
        ajoutés au panier.
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger className="align-text-top">
              <Icons.info className="h-4 w-4 ml-2" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="w-[300px]">
                Les produits dont vous avez besoin pour préparer cette recette
                sont automatiquement ajoutés au panier en quantité necessaire en
                fonction du nombre de personnes, des excès d&aposingredients
                d&aposautres recettes ajoutées, et des ingrédients présents dans
                votre fridge.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </p>

      <Separator />

      <div className="space-y-2">
        {quantity?.map((item, key) => (
          <Fragment key={key}>
            {item && (
              <IngredientListItem
                ingredient={
                  Array.isArray(item) ? item[0].ingredient : item.ingredient
                }
                amount={item.amount ? (item.amount / 2) * persons : null}
                unit={item.unit}
              />
            )}
          </Fragment>
        ))}
      </div>
    </>
  )
}
