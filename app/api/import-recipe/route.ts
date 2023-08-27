import { cookies } from "next/headers"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { NodeHtmlMarkdown } from "node-html-markdown"
import { z } from "zod"

import { Database } from "@/lib/database.types"
import { InvalidImportUrlError, InvalidRecipeError } from "@/lib/exceptions"
import {
  createRecipeUuid,
  fetchHelloFreshRecipe,
  importHelloFreshRecipe,
} from "@/lib/importHelloFresh"
import { recipeSchema } from "@/lib/validations/recipe"

type RecipeData = z.infer<typeof recipeSchema>

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const url: string = body.url

    // Check validity of the given URL
    /** @todo Use a regex instead */
    if (!url.includes("www.hellofresh")) throw new InvalidImportUrlError()
    const id = url.split("-").pop()
    if (!id) throw new InvalidImportUrlError()

    const recipe_uuid = createRecipeUuid(id)

    const result = await fetchHelloFreshRecipe(id)

    const recipe = result.items[0]

    if (!recipe.yields[0]) throw new InvalidRecipeError()

    const quantities = await Promise.all(
      recipe.yields[0].ingredients.map(async (quantity) => {
        const helloFreshIngredient = recipe.ingredients.find(
          (ingr) => ingr.id === quantity.id
        )

        if (!helloFreshIngredient) throw new InvalidRecipeError()
        let ingredient_id = `NOMATCH_${helloFreshIngredient.name}`

        const matchingDbIngredient = await searchIngredient(
          helloFreshIngredient.name
        )
        if (matchingDbIngredient) ingredient_id = matchingDbIngredient

        return {
          ingredient_id,
          amount: quantity.amount || 0,
          unit: quantity.unit,
        }
      })
    )

    const recipeData: RecipeData = {
      name: recipe.name,
      ingredients: quantities,
      steps: recipe.steps.map((step) => ({
        instructionsMarkdown: NodeHtmlMarkdown.translate(
          step.instructionsMarkdown
        ),
      })),
      is_public: false,
      tags: [],
      difficulty: recipe.difficulty,
      prep_duration_min: parseInt(recipe.prepTime.slice(2, 4)),
    }

    return new Response(JSON.stringify(recipeData))
  } catch (err) {
    if (err instanceof InvalidImportUrlError)
      return new Response(err.message, { status: 400 })
    console.error(err)
    return new Response(null, { status: 500 })
  }
}

async function searchIngredient(name: string) {
  const supabase = createRouteHandlerClient<Database>({ cookies })
  const response = await supabase
    .from("ingredient")
    .select("*")
    .order("name", { ascending: true })
    .textSearch("name", name, {
      type: "plain",
    })
  const matchingDbIngredient = response.data?.[0]
  return matchingDbIngredient?.id || null
}
