import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"

import { createServerSupabaseClient } from "@/lib/supabase-server-client"

import { RecipePrice } from "./recipe-price"
import { Skeleton } from "./ui/skeleton"

type Props = {
  searchValue: string
  cuisine?: string
  tag?: string
  ingredient?: string
}

export async function RecipesList({
  searchValue,
  cuisine,
  ingredient,
  tag,
}: Props) {
  const supabase = createServerSupabaseClient()
  let req = supabase
    .from("recipe")
    .select(`*,tag!inner(*),cuisine!inner(*),ingredient!inner(*)`)

  if (searchValue)
    req = req.textSearch("name", searchValue, {
      type: "websearch",
    })

  if (cuisine) req = req.in("cuisine.id", cuisine.split(","))
  if (tag) req = req.in("tag.id", tag.split(","))
  if (ingredient) req = req.in("ingredient.id", ingredient.split(","))

  const { data: recipes, error } = await req

  if (!recipes || !recipes.length) return <p>No results</p>

  const session = await supabase.auth.getSession()

  const id = new Date().toISOString()

  return (
    <>
      {recipes?.map((r, index) => (
        <Link key={r.id + id} href={`/recipes/${r.id}`}>
          <div
            className="space-y-3 transition-all animate-fade-in opacity-0"
            style={{ animationDelay: `${index * 25}ms` }}
          >
            <div className="overflow-hidden rounded-md aspect-square relative">
              <Image
                src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/recipe/${r.id}.png`}
                alt={r.name}
                fill
                className="object-cover bg-muted"
                quality={25}
              />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-medium truncate">{r.name}</h3>
              <p className="text-sm text-muted-foreground truncate">
                {r.headline}
              </p>
              <Suspense
                fallback={<Skeleton className="h-5 w-[100px]"></Skeleton>}
              >
                <RecipePrice persons={2} id={r.id} />
              </Suspense>
            </div>
          </div>
        </Link>
      ))}
    </>
  )
}
