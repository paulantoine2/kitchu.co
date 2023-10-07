import { cookies } from "next/headers"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { z } from "zod"

import { Database } from "@/lib/database.types"
import { supabaseAdmin } from "@/lib/supabase"
import { recipeSchema } from "@/lib/validations/recipe"

export async function POST(req: Request) {
  try {
    const supabase = createRouteHandlerClient<Database>({ cookies })
    const session = await supabase.auth.getSession()

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    const json = await req.json()

    const body = recipeSchema.parse(json)

    console.log(body)

    const recipeInsert = await supabaseAdmin
      .from("recipe")
      .insert({
        author: session.data.session?.user.id,
        difficulty: body.difficulty,
        is_public: body.is_public,
        prep_time_min: body.prep_duration_min,
        name: body.name,
        steps: body.steps.map(({ instructionsMarkdown }, index) => ({
          images: [],
          index,
          instructionsMarkdown,
          videos: [],
        })),
      })
      .select()

    if (recipeInsert.error) throw recipeInsert.error

    const id = recipeInsert.data[0]?.id

    if (!id) throw new Error("Invalid id")

    const ingredientInsert = await supabaseAdmin
      .from("recipe_ingredient")
      .insert(
        body.ingredients.map((i) => ({
          ingredient_id: i.ingredient.id,
          recipe_id: id,
          quantity: i.quantity,
          unit_id: i.unit,
        }))
      )

    if (ingredientInsert.error) {
      await supabaseAdmin.from("recipe").delete().eq("id", id)
      throw ingredientInsert.error
    }
    return new Response(JSON.stringify({ id }))
  } catch (error) {
    console.error(error)
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
