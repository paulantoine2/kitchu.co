import { notFound } from "next/navigation"

import { Step } from "@/types/data"
import { Json } from "@/lib/database.types"
import markdownToHtml from "@/lib/markDownToHTML"
import { makeSupabase } from "@/lib/supabase"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { RecipeImage } from "@/components/recipe/recipe-image"
import { RecipeIngredientsList } from "@/components/recipe/recipe-ingredients-list"

async function getRecipe(id: number) {
  const { data, error } = await makeSupabase({ cache: "force-cache" })
    .from("recipe")
    .select(
      `
        *,
        recipe_ingredient (
          quantity,unit(id,short_name),ingredient(id,name)
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

  if (!data) notFound()

  return (
    <>
      <div className="relative w-full h-[400px] rounded-md overflow-hidden my-4">
        <RecipeImage recipe={data} fill className="object-cover bg-muted" />
      </div>
      <div className="grid grid-cols-3 gap-16">
        <div className="col-span-2">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mt-4">
            {data.name}
          </h1>
          <Separator className="my-4" />

          {data.steps &&
            data.steps.map((stepJson: Json) => {
              if (!stepJson || typeof stepJson !== "string") return null
              const step: Step = JSON.parse(stepJson)
              return <StepBody key={step.index} step={step} />
            })}
        </div>
        <div className="pt-6">
          <Card className="space-y-4 p-6">
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
                },
              }))}
              recipe_id={params.id}
            />
          </Card>
        </div>
      </div>
    </>
  )
}

async function StepBody({ step }: { step: Step }) {
  const content = await markdownToHtml(step?.instructionsMarkdown)

  return (
    <div>
      <h3>Step {step.index}</h3>
      <div
        className="p-6"
        key={step.index}
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
    </div>
  )
}
