"use client"

import { useState } from "react"

import { Ingredient, Quantity } from "@/types/data"
import { supabase } from "@/lib/supabase"
import { createServerSupabaseClient } from "@/lib/supabase-server-client"

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
}: {
  quantity: (Quantity | null)[]
}) {
  const [persons, setPersons] = useState(2)
  return (
    <>
      <div className="flex items-center w-full">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setPersons((prev) => prev - 1)}
        >
          <Icons.minus className="h-4 w-4" />
        </Button>
        <div className="flex-1 text-center">{persons} personnes</div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setPersons((prev) => prev + 1)}
        >
          <Icons.plus className="h-4 w-4" />
        </Button>
      </div>
      <Button className="w-full" size="lg">
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
          <>
            {item && (
              <IngredientListItem
                key={key}
                ingredient={
                  Array.isArray(item) ? item[0].ingredient : item.ingredient
                }
                amount={item.amount ? (item.amount / 2) * persons : null}
                unit={item.unit}
              />
            )}
          </>
        ))}
      </div>
    </>
  )
}
