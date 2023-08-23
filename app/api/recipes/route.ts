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
    const id = uuid()

    await supabase.from("recipe").insert({
      id,
      name: body.name,
      steps: body.steps.map(({ instructionsMarkdown }, index) => ({
        images: [],
        index,
        instructionsMarkdown,
        videos: [],
      })),
    })

    await supabase.from("quantity").insert(
      body.ingredients.map((i) => ({
        ingredient_id: i.ingredient_id,
        recipe_id: id,
        amount: i.amount,
        unit: i.unit,
      }))
    )

    if (body.cuisine) {
      await supabase
        .from("recipe_cuisine")
        .insert({ recipe_id: id, cuisine_id: body.cuisine })
    }

    return new Response(JSON.stringify({ uuid: id }))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
