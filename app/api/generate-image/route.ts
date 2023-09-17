import { generateImageFiles } from "bimg"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const prompt: string = body.prompt

    const imageFiles = await generateImageFiles(prompt)

    return new Response(JSON.stringify(imageFiles))
  } catch (err) {
    console.error(err)
    return new Response(null, {
      status: 500,
      statusText: err instanceof Error ? err.message : err + "",
    })
  }
}
