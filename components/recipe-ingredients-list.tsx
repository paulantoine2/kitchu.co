import { getRecipePrice, getRecipeYields } from "@/lib/supabase"

import IngredientListItem from "./ingredient-list-item"
import { RecipePrice } from "./recipe-price"
import { Card } from "./ui/card"

export async function RecipeIngredientsList({ id }: { id: string }) {
  const { data, error } = await getRecipeYields(id)

  console.log(data)

  return (
    <Card className="p-8">
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Ingredients list
      </h2>
      <RecipePrice id={id} />
      {data?.map(
        (item, key) =>
          item.ingredient && (
            <IngredientListItem
              key={key}
              ingredient={
                Array.isArray(item.ingredient)
                  ? item.ingredient[0]
                  : item.ingredient
              }
              amount={item.amount}
              unit={item.unit}
            />
          )
      )}
    </Card>
  )
}
