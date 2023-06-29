import Image from "next/image"

import { Ingredient } from "@/types/data"
import { getAllIngredients } from "@/lib/supabase"
import { createServerSupabaseClient } from "@/lib/supabase-server-client"
import { Alert } from "@/components/ui/alert"
import IngredientListItem from "@/components/ingredient-list-item"

export const revalidate = 60

export default async function IngredientsPage() {
  const {
    count,
    data: items,
    error,
    status,
    statusText,
  } = await getAllIngredients(createServerSupabaseClient())

  if (error) return <Alert>{error.message}</Alert>

  const groups: Record<string, Ingredient[]> = {}

  items.forEach((item) => {
    if (!groups[item.category]) groups[item.category] = []
    groups[item.category].push(item)
  })

  return (
    <div className="container">
      {Object.entries(groups).map(([id, ingredients]) => (
        <div key={id} className="my-10">
          <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 capitalize">
            {id}
          </h1>
          <div className="grid grid-cols-3 gap-6 my-4">
            {ingredients.map((i) => (
              <IngredientListItem key={i.id} ingredient={i} />
            ))}
          </div>
        </div>
      ))}
      {/* {items.length > 0 ? (
        <div className="grid grid-cols-5 gap-6 my-4">
          {items.map((i) => (
            <IngredientListItem key={i.id} ingredient={i} />
          ))}
        </div>
      ) : (
        <h1>No results</h1>
      )} */}
    </div>
  )
}
