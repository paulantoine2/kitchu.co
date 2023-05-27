import Image from "next/image"

import { getAllIngredients } from "@/lib/supabase"
import { Alert } from "@/components/ui/alert"
import Ingredient from "@/components/ingredient"

export const revalidate = 60

export default async function IngredientsPage() {
  const {
    count,
    data: items,
    error,
    status,
    statusText,
  } = await getAllIngredients()

  if (error) return <Alert>{error.message}</Alert>

  return (
    <div className="container">
      {items.length > 0 ? (
        <div className="grid grid-cols-5 gap-6 my-4">
          {items.map((i) => (
            <Ingredient key={i.id} ingredient={i} />
          ))}
        </div>
      ) : (
        <h1>No results</h1>
      )}
    </div>
  )
}
