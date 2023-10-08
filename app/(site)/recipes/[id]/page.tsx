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
  TypographyP,
  TypographySmall,
} from "@/components/ui/typography"
import { Icons } from "@/components/icons"
import RecipeCard from "@/components/recipe/recipe-card"
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
      <div className="flex flex-row gap-16 items-start">
        <div className="relative flex-1 aspect-square rounded-md overflow-hidden">
          <RecipeImage recipe={data} fill className="object-cover bg-muted" />
        </div>
        <div className="space-y-8 w-[40%]">
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
        </div>
      </div>
      <Separator />
      <TypographyH2>Ingrédients</TypographyH2>
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
      <TypographyH2>Préparation</TypographyH2>
      {data.steps &&
        data.steps.map((step) => {
          return <StepBody key={(step as Step).index} step={step as Step} />
        })}
      <Separator />
      <TypographyH2>Valeurs nutritionelles</TypographyH2>
      <TypographyP>On y travaille 👀</TypographyP>
      <Separator />
      <TypographyH2>Ces recettes peuvent vous intéresser</TypographyH2>
      <RecipesRecom exclude_id={params.id} />
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

async function getRecipesRecom(exclude_id: number) {
  const { data, error } = await supabase
    .from("recipe")
    .select(
      `
        *
      `
    )
    .neq("id", exclude_id)
    .limit(3)

  return data
}

async function RecipesRecom({ exclude_id }: { exclude_id: number }) {
  const recipes = await getRecipesRecom(exclude_id)

  return (
    <div className="grid grid-cols-3 gap-8">
      {recipes?.map((recipe) => (
        <RecipeCard animationDelay={0} key={recipe.id} recipe={recipe} />
      ))}
    </div>
  )
}
