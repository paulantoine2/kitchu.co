import { cookies } from "next/headers"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"

import { InvalidImportUrlError } from "@/lib/exceptions"
import {
  createRecipeUuid,
  importHelloFreshRecipe,
} from "@/lib/importHelloFresh"

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

    const supabase = createRouteHandlerClient({ cookies })

    // Check if recipe already exists
    // const { data, error } = await supabase.from("recipe").select().eq("id", id)
    // if (error) throw error
    // if (data?.length) return new Response(JSON.stringify({ uuid: recipe_uuid }))

    await importHelloFreshRecipe(supabase, id)

    return new Response(JSON.stringify({ uuid: recipe_uuid }))
  } catch (err) {
    if (err instanceof InvalidImportUrlError)
      return new Response(err.message, { status: 400 })
    console.error(err)
    return new Response(null, { status: 500 })
  }
}
