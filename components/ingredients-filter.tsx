"use client"

import { Ingredient } from "@/types/data"

import { IngredientItem } from "./fridge-old"
import IngredientListItem from "./ingredient-list-item"

export default function IngredientsFilter({
  ingredients,
}: {
  ingredients: Ingredient[]
}) {
  return (
    <div>
      {ingredients?.map((ingredient) => (
        <IngredientListItem ingredient={ingredient} key={ingredient.id} />
      ))}
    </div>
  )
}
