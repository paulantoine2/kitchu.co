import { getRecipePrice, getRecipeYields } from "@/lib/supabase"
import { createServerSupabaseClient } from "@/lib/supabase-server-client"

import { Icons } from "./icons"
import IngredientListItem from "./ingredient-list-item"
import { RecipePrice } from "./recipe-price"
import { Button } from "./ui/button"
import { Card } from "./ui/card"

export async function RecipeIngredientsList({ id }: { id: string }) {
  const { data, error } = await getRecipeYields(createServerSupabaseClient(), {
    id,
  })

  return (
    <div className="space-y-4 pb-10">
      <div className="space-y-2">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Ingredients list
        </h2>

        <RecipePrice id={id} persons={10} />
      </div>
      <Button className="w-full" size="lg">
        <Icons.cart className="h-4 w-4 mr-2" />
        Tout ajouter au panier
      </Button>
      <div className="space-y-2">
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
      </div>
    </div>
  )
}
