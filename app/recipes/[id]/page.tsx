import Image from "next/image"

import { getRecipe } from "@/lib/supabase"
import { Alert } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { RecipeIngredientsList } from "@/components/recipe-ingredients-list"

export const revalidate = 0

export default async function RecipePage({
  params,
}: {
  params: { id: string }
}) {
  const { data, error } = await getRecipe(params.id)

  if (error) return <Alert variant={"destructive"}>{error.message}</Alert>

  return (
    <div>
      <div className="relative w-full h-[400px] rounded-md overflow-hidden ">
        <Image
          src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/recipe/${params.id}.png`}
          alt={data.name}
          fill
          className="object-cover bg-muted"
        />
      </div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mt-4   ">
        {data.name}
      </h1>
      <p className="text-xl text-muted-foreground">{data.headline}</p>
      {/* @ts-expect-error Async Server Component */}
      <RecipeIngredientsList id={params.id} />
    </div>
  )
}
