import Image from "next/image"
import Link from "next/link"

import { getRecipe } from "@/lib/supabase"
import { Alert } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
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
      <div className="relative w-full h-[400px] rounded-md overflow-hidden my-4">
        <Image
          src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/recipe/${params.id}.png`}
          alt={data.name}
          fill
          className="object-cover bg-muted"
        />
      </div>

      <div className="grid grid-cols-3 gap-16">
        <div className="col-span-2">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mt-4">
            {data.name}
          </h1>
          <p className="text-xl text-muted-foreground">{data.headline}</p>
          <div className="space-x-1 mt-2">
            {Array.isArray(data.cuisine) &&
              data.cuisine.map((cuisine, key) => (
                <Badge key={key} variant="cuisine">
                  {cuisine.name}
                </Badge>
              ))}
            {Array.isArray(data.tag) &&
              data.tag.map((tag, key) => <Badge key={key}>{tag.name}</Badge>)}
          </div>
          <Separator className="my-4" />
          <div className="flex items-center justify-center h-[400px]">
            {data.link && (
              <Link
                className={buttonVariants({ size: "lg" })}
                href={data.link}
                target="_blank"
              >
                Open recipe on HelloFresh
              </Link>
            )}
          </div>
        </div>
        <div className="pt-6">
          {/* @ts-expect-error Async Server Component */}
          <RecipeIngredientsList id={params.id} />
        </div>
      </div>
    </div>
  )
}
