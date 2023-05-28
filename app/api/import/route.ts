import { InvalidImportUrlError } from "@/lib/exceptions"
import {
  createRecipeUuid,
  importHelloFreshRecipe,
} from "@/lib/importHelloFresh"
import { getRecipe } from "@/lib/supabase"

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
    const { data, error } = await getRecipe(recipe_uuid)
    if (error) throw error
    if (data?.length) return new Response(JSON.stringify({ uuid: recipe_uuid }))

    await importHelloFreshRecipe(id)

    return new Response(JSON.stringify({ uuid: recipe_uuid }))
  } catch (err) {
    if (err instanceof InvalidImportUrlError)
      return new Response(err.message, { status: 400 })
    return new Response(null, { status: 500 })
  }
}
