import { notFound } from "next/navigation"

import { Step } from "@/types/data"
import { Json } from "@/lib/database.types"
import markdownToHtml from "@/lib/markDownToHTML"
import { supabase } from "@/lib/supabase"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyMuted,
  TypographySmall,
} from "@/components/ui/typography"
import { Icons } from "@/components/icons"
import { RecipeImage } from "@/components/recipe/recipe-image"
import {
  RecipeIngredientListItem,
  RecipeIngredientsList,
} from "@/components/recipe/recipe-ingredients-list"

async function getRecipe(id: number) {
  const { data, error } = await supabase
    .from("recipe")
    .select(
      `
        *,
        recipe_ingredient (
          quantity,unit(id,short_name),ingredient(id,name,picture_url)
        )
      `
    )
    .eq("id", id)
    .single()

  return data
}

export default async function RecipePage({
  params,
}: {
  params: { id: number }
}) {
  const data = await getRecipe(params.id)

  console.log(data)

  if (!data) notFound()

  return (
    <div className="container space-y-8 my-8">
      <div className="relative w-full h-[400px] rounded-md overflow-hidden">
        <RecipeImage recipe={data} fill className="object-cover bg-muted" />
      </div>
      <div className="flex flex-row">
        <div className="w-[58%] space-y-8">
          <TypographyH1>{data.name}</TypographyH1>
          <div className="grid grid-cols-2">
            <div className="flex gap-4 items-center">
              <Icons.chef />
              <div className="space-y-1">
                <TypographyMuted>Difficulté</TypographyMuted>
                <TypographySmall>Intermédiaire</TypographySmall>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <Icons.clock />
              <div className="space-y-1">
                <TypographyMuted>Temps de préparation</TypographyMuted>
                <TypographySmall>35 min</TypographySmall>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[33%] ml-[9%] space-y-4 sticky top-16">
          <Card className="space-y-4 p-6">
            <div className="flex items-center">
              <TypographyH3>3.43 €</TypographyH3>
              <TypographySmall>par portion</TypographySmall>
            </div>

            <RecipeIngredientsList
              recipe_ingredients={data.recipe_ingredient.map((ri) => ({
                quantity: ri.quantity,
                unit: {
                  id: ri.unit?.id || 0,
                  short_name: ri.unit?.short_name || "",
                },
                ingredient: {
                  id: ri.ingredient?.id || 0,
                  name: ri.ingredient?.name || "",
                  picture_url: ri.ingredient?.picture_url || null,
                },
              }))}
              recipe_id={params.id}
            />
          </Card>
        </div>
      </div>

      <Separator />
      <TypographyH3>Ingrédients</TypographyH3>
      <div className="grid grid-cols-4 gap-4">
        {data.recipe_ingredient.map((ri, index) => (
          <RecipeIngredientListItem
            persons={2}
            key={index}
            recipe_ingredient={{
              quantity: ri.quantity,
              unit: {
                id: ri.unit?.id || 0,
                short_name: ri.unit?.short_name || "",
              },
              ingredient: {
                id: ri.ingredient?.id || 0,
                name: ri.ingredient?.name || "",
                picture_url: ri.ingredient?.picture_url || null,
              },
            }}
          />
        ))}
      </div>
      <Separator />
      <TypographyH3>Préparation</TypographyH3>
      {data.steps &&
        data.steps.map((step) => {
          return <StepBody key={(step as Step).index} step={step as Step} />
        })}
    </div>
  )
}

async function StepBody({ step }: { step: Step }) {
  const content = await markdownToHtml(step?.instructionsMarkdown)

  return (
    <div>
      <TypographyH4 className="mb-4">{step.index + 1}</TypographyH4>
      <div
        className="markdown"
        key={step.index}
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
    </div>
  )
}
