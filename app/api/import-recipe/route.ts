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

    // Check if recipe already exists
    // const { data, error } = await supabase.from("recipe").select().eq("id", id)
    // if (error) throw error
    // if (data?.length) return new Response(JSON.stringify({ uuid: recipe_uuid }))

    const result = await fetchHelloFreshRecipe(id)

    console.log(result)

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
    .textSearch("name", name, {
      type: "websearch",
    })
  const matchingDbIngredient = response.data?.[0]
  return matchingDbIngredient?.id || null
}
