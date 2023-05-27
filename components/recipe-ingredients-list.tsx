import { getRecipeYields } from "@/lib/supabase"

import Ingredient from "./ingredient"
import { Card } from "./ui/card"

export async function RecipeIngredientsList({ id }: { id: string }) {
  const { data, error } = await getRecipeYields(id)

  return (
    <Card className="p-8">
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Ingredients list
      </h2>
      {data?.map(
        (item, key) =>
          item.ingredient && (
            <Ingredient
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
