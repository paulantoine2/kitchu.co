"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { useSupabase } from "@/app/supabase-provider"

import { useCart } from "../cart/cart-provider"
import { Icons } from "../icons"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip"
import { IngredientImage } from "./ingredient-image"

type RecipeIngredient = {
  quantity: number
  unit: { id: number; short_name: string }
  ingredient: { id: number; name: string }
}

export function RecipeIngredientsList({
  recipe_ingredients,
  recipe_id,
}: {
  recipe_ingredients: RecipeIngredient[]
  recipe_id: number
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
        {recipe_ingredients.map((item, key) => (
          <RecipeIngredientListItem key={key} recipe_ingredient={item} />
        ))}
      </div>
    </>
  )
}

function RecipeIngredientListItem({
  recipe_ingredient,
}: {
  recipe_ingredient: RecipeIngredient
}) {
  return (
    <div className=" pl-1 pr-4 space-x-3 transition-all animate-fade-in flex items-center">
      <div className="overflow-hidden rounded-full aspect-square relative w-16 h-16 p-2 ">
        <IngredientImage
          ingredient={recipe_ingredient.ingredient}
          width={100}
          height={100}
          className="object-cover"
        />
      </div>
      <div className="overflow-hidden flex-1">
        <h3 className="text-sm font-medium truncate">
          {recipe_ingredient.ingredient.name}
        </h3>
        <p className="text-sm text-muted-foreground">{`${recipe_ingredient.quantity} ${recipe_ingredient.unit.short_name}`}</p>
      </div>
    </div>
  )
}
