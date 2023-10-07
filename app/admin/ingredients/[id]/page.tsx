import { notFound } from "next/navigation"

import { makeSupabase, supabase } from "@/lib/supabase"
import { TypographyH1 } from "@/components/ui/typography"
import { IngredientForm } from "@/components/ingredient/ingredient-form"

export const revalidate = 0

async function getIngredient(id: number) {
  const { data, error } = await supabase
    .from("ingredient")
    .select(
      `
        *,
        unit(*)
      `
    )
    .eq("id", id)
    .single()

  return data
}

async function getUnits() {
  const { data, error } = await supabase.from("unit").select(`*`)

  return data
}

export default async function IngredientPage({
  params,
}: {
  params: { id: number }
}) {
  const ingredient = await getIngredient(params.id)

  if (!ingredient) return notFound()

  const units = await getUnits()

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
          units: ingredient.unit.map((u) => u.id),
        }}
        units={units || []}
        pictureUrl={ingredient.picture_url}
      />
    </div>
  )
}
