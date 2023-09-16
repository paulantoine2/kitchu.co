import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { v4 as uuid } from "uuid"
import { z } from "zod"

import { Database } from "@/lib/database.types"
import { createServerSupabaseClient } from "@/lib/supabase-server-client"
import { recipeSchema } from "@/lib/validations/recipe"

export const dynamic = "force-dynamic"

export async function POST(req: Request) {
  try {
    const supabase = createRouteHandlerClient<Database>({ cookies })
    const session = await supabase.auth.getSession()

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    const json = await req.json()
    const body = recipeSchema.parse(json)

    const { data, error } = await supabase
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

    if (error) throw error

    const id = data[0]?.id

    if (!id) throw new Error("Invalid id")

    await supabase.from("recipe_ingredient").insert(
      body.ingredients.map((i) => ({
        ingredient_id: i.ingredient_id,
        recipe_id: id,
        quantity: i.quantity,
        unit_id: i.unit,
      }))
    )

    return new Response(JSON.stringify({ id }))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
