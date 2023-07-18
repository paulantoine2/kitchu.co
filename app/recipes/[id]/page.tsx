import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { makeSupabase, supabase } from "@/lib/supabase"
import { createServerSupabaseClient } from "@/lib/supabase-server-client"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Icons } from "@/components/icons"
import IngredientListItem from "@/components/ingredient-list-item"
import { RecipeIngredientsList } from "@/components/recipe-ingredients-list"
import { RecipePrice } from "@/components/recipe-price"

export default async function RecipePage({
  params,
}: {
  params: { id: string }
}) {
  const { data, error } = await makeSupabase({ cache: "force-cache" })
    .from("recipe")
    .select(
      `
        *,
        tag (
          name
        ),
        cuisine (
          name
        ),
        quantity (
          amount,unit,ingredient(id,name)
        )
      `
    )
    .eq("id", params.id)
    .single()

  if (!data) notFound()

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
          <Card className="space-y-4 p-6">
            <Suspense>
              <RecipePrice id={params.id} persons={2} />
            </Suspense>

            <RecipeIngredientsList quantity={data.quantity} />
          </Card>
        </div>
      </div>
    </div>
  )
}
