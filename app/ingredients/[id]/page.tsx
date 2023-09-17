import { notFound } from "next/navigation"

import { makeSupabase } from "@/lib/supabase"
import { TypographyH1 } from "@/components/ui/typography"
import { IngredientForm } from "@/components/ingredient/ingredient-form"

async function getIngredient(id: number) {
  const { data, error } = await makeSupabase({ cache: "no-cache" })
    .from("ingredient")
    .select(
      `
        *
        
      `
    )
    .eq("id", id)
    .single()

  return data
}

export default async function IngredientPage({
  params,
}: {
  params: { id: number }
}) {
  const ingredient = await getIngredient(params.id)

  if (!ingredient) return notFound()

  console.log(ingredient)

  return (
    <div>
      <div className="my-12">
        <TypographyH1>Modifier un ingrédient</TypographyH1>
      </div>
      <IngredientForm
        id={params.id}
        defaultValues={{
          category: ingredient.category,
          name: ingredient.name,
          picture_data: ingredient.picture_url || undefined,
        }}
      />
    </div>
  )
}
