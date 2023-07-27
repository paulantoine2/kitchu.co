import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"

import { createServerSupabaseClient } from "@/lib/supabase-server-client"

import { RecipePrice } from "./recipe-price"
import RecipeCard from "./recipe/recipe-card"
import { Skeleton } from "./ui/skeleton"

type Props = {
  searchValue: string
  cuisine?: string
  tag?: string
  ingredient?: string
  limit?: number
}

export async function RecipesList({
  searchValue,
  cuisine,
  ingredient,
  tag,
  limit,
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
  if (limit) req = req.limit(limit)

  const { data: recipes, error } = await req

  if (!recipes || !recipes.length) return <p>No results</p>

  const id = new Date().toISOString()

  return (
    <>
      {recipes?.map((r, index) => (
        <RecipeCard key={r.id + id} animationDelay={index * 25} recipe={r} />
      ))}
    </>
  )
}
