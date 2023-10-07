import { cookies } from "next/headers"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { decode } from "base64-arraybuffer"
import { z } from "zod"

import { Database } from "@/lib/database.types"
import { supabaseAdmin } from "@/lib/supabase"
import { ingredientSchema } from "@/lib/validations/ingredient"

const routeContextSchema = z.object({
  params: z.object({
    ingredientId: z.string(),
  }),
})

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate route params.
    const { params } = routeContextSchema.parse(context)

    const id = params.ingredientId

    const json = await req.json()
    const body = ingredientSchema.parse(json)

    console.log(body)

    if (body.picture_data) {
      const { data, error } = await supabaseAdmin.storage
        .from("images")
        .upload(
          `ingredient/${id}.png`,
          decode(removeImageDataPrefix(body.picture_data)),
          {
            contentType: "image/png",
            upsert: true,
          }
        )
      console.log(data, error)
      if (error) throw error
    }

    const { data, error } = await supabaseAdmin
      .from("ingredient")
      .update({
        name: body.name,
        ...(body.picture_data && {
          picture_url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/ingredient/${id}.png`,
        }),
      })
      .eq("id", id)
      .select()

    if (error) throw error

    await supabaseAdmin.from("ingredient_unit").delete().eq("ingredient_id", id)

    console.log(body)

    if (body.units.length)
      await supabaseAdmin
        .from("ingredient_unit")
        .insert(
          body.units.map((unit) => ({ ingredient_id: +id, unit_id: unit }))
        )

    return new Response(JSON.stringify({ id }))
  } catch (error) {
    console.error(error)
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}

function removeImageDataPrefix(dataUrl: string): string {
  const prefix = "data:image/png;base64, "
  if (dataUrl.startsWith(prefix)) {
    return dataUrl.slice(prefix.length)
  }
  return dataUrl
}
