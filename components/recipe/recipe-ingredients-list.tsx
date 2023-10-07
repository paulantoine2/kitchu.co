"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { useSupabase } from "@/app/supabase-provider"

import { useCart } from "../cart/cart-provider"
import { Icons } from "../icons"
import { IngredientImage } from "../ingredient/ingredient-image"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip"

type RecipeIngredient = {
  quantity: number
  unit: { id: number; short_name: string }
  ingredient: { id: number; name: string; picture_url: string | null }
}

export function RecipeIngredientsList({
  recipe_ingredients,
  recipe_id,
}: {
  recipe_ingredients: RecipeIngredient[]
  recipe_id: number
}) {
  const [persons, setPersons] = useState(2)

  const pending = false

  const handleAddToCart = () => {
    alert("todo")
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center w-full">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setPersons((prev) => prev - 1)}
          disabled={persons === 1}
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
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="w-full">
            <Button
              className="w-full"
              size="lg"
              disabled={pending}
              onClick={handleAddToCart}
            >
              <Icons.cart className="h-5 w-5 mr-3" />
              Ajouter les ingrédients au panier
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="w-[300px]">
              Les produits dont vous avez besoin pour préparer cette recette
              sont automatiquement ajoutés au panier en quantité necessaire en
              fonction du nombre de personnes, des excès d&apos;ingredients
              d&aposautres recettes ajoutées, et des ingrédients présents dans
              votre fridge.
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Button
        className="w-full"
        size="lg"
        disabled={pending}
        onClick={handleAddToCart}
        variant="outline"
      >
        <Icons.love className="h-5 w-5 mr-3" />
        Ajouter aux favoris
      </Button>
    </div>
  )
}

export function RecipeIngredientListItem({
  recipe_ingredient,
  persons,
}: {
  recipe_ingredient: RecipeIngredient
  persons: number
}) {
  return (
    <div className="space-x-3 transition-all animate-fade-in flex items-center">
      <div className="overflow-hidden rounded-md aspect-square relative w-16 h-16">
        <IngredientImage
          ingredient={recipe_ingredient.ingredient}
          width={80}
          height={80}
          className="object-cover"
        />
      </div>
      <div className="overflow-hidden flex-1">
        <h3 className="text-sm font-medium truncate">
          {recipe_ingredient.ingredient.name}
        </h3>
        <p className="text-sm text-muted-foreground">{`${
          recipe_ingredient.quantity * persons
        } ${recipe_ingredient.unit.short_name}`}</p>
      </div>
    </div>
  )
}
