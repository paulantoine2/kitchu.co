import { cookies } from "next/headers"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { NodeHtmlMarkdown } from "node-html-markdown"
import { z } from "zod"

import { Database } from "@/lib/database.types"
import { InvalidImportUrlError, InvalidRecipeError } from "@/lib/exceptions"
import { fetchHelloFreshRecipe } from "@/lib/importHelloFresh"
import { makeSupabase } from "@/lib/supabase"
import { importRecipeSchema } from "@/lib/validations/recipe"

type RecipeData = z.infer<typeof importRecipeSchema>

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const url: string = body.url

    // Check validity of the given URL
    /** @todo Use a regex instead */
    if (!url.includes("www.hellofresh")) throw new InvalidImportUrlError()
    const id = url.split("-").pop()
    if (!id) throw new InvalidImportUrlError()

    const result = await fetchHelloFreshRecipe(id)

    const recipe = result.items[0]

    if (!recipe.yields[0]) throw new InvalidRecipeError()

    const ingredients = await Promise.all(
      recipe.yields[0].ingredients.map(async (quantity) => {
        const helloFreshIngredient = recipe.ingredients.find(
          (ingr) => ingr.id === quantity.id
        )

        if (!helloFreshIngredient) throw new InvalidRecipeError()

        const matchingDbIngredient = await searchIngredient(
          helloFreshIngredient.name
        )

        const matchingDbUnit = matchingDbIngredient
          ? await searchUnit(quantity.unit, matchingDbIngredient.id)
          : undefined

        return {
          ingredient: {
            id: matchingDbIngredient?.id || 0,
            name: matchingDbIngredient?.name || helloFreshIngredient.name,
            exists: Boolean(matchingDbIngredient),
            picture_url: matchingDbIngredient?.picture_url,
          },
          quantity: quantity.amount || 0,
          unit: matchingDbUnit || undefined,
        }
      })
    )

    const recipeData: RecipeData = {
      name: recipe.name + " " + recipe.headline,
      ingredients,
      steps: recipe.steps.map((step) => ({
        instructionsMarkdown: NodeHtmlMarkdown.translate(
          step.instructionsMarkdown
        ),
      })),
      is_public: false,
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

async function searchIngredient(ingredientName: string) {
  const response = await makeSupabase({})
    .from("ingredient")
    .select("*")
    .ilike("name", `${ingredientName}%`)
    .order("name", { ascending: true })
  const matchingDbIngredient = response.data?.[0]
  return matchingDbIngredient || null
}

async function searchUnit(unitName: string, ingredient_id: number) {
  const response = await makeSupabase({})
    .from("ingredient_unit")
    .select("*,unit!inner(*)")
    .eq("ingredient_id", ingredient_id)
    .ilike("unit.short_name", `${unitName}`)
  console.log(response.data)
  const matchingDbUnit = response.data?.[0]
  return matchingDbUnit?.unit_id || null
}
