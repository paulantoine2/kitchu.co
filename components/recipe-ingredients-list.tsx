import { Suspense } from "react"

import { supabase } from "@/lib/supabase"
import { createServerSupabaseClient } from "@/lib/supabase-server-client"

import { Icons } from "./icons"
import IngredientListItem from "./ingredient-list-item"
import { RecipePrice } from "./recipe-price"
import { Button } from "./ui/button"

export async function RecipeIngredientsList({ id }: { id: string }) {
  const { data, error } = await supabase
    .from("quantity")
    .select("amount,unit,ingredient(id,name)")
    .eq("recipe_id", id)

  const session = await createServerSupabaseClient().auth.getSession()

  return (
    <div className="space-y-4 pb-10">
      <div className="space-y-2">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Ingredients list
        </h2>
        <Suspense>
          <RecipePrice
            id={id}
            persons={10}
            salepoint_id={
              session?.data?.session?.user.user_metadata?.market_salepoint
                ?.id || undefined
            }
          />
        </Suspense>
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
