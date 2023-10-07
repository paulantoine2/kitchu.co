import { z } from "zod"

import { supabaseAdmin } from "@/lib/supabase"
import { unitSchema } from "@/lib/validations/unit"

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const body = unitSchema.parse(json)

    const { data, error } = await supabaseAdmin
      .from("unit")
      .insert(body)
      .select()

    if (error) throw error

    const id = data[0]?.id

    if (!id) throw new Error("Invalid id")

    return new Response(JSON.stringify({ id }))
  } catch (error) {
    console.error(error)
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
