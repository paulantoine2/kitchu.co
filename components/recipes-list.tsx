"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  SupabaseClient,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs"

import { searchRecipes } from "@/lib/supabase"
import { useSupabaseQuery } from "@/hooks/useSupabaseQuery"
import { useSupabase } from "@/app/supabase-provider"

import { RecipePrice } from "./recipe-price"

export function RecipesList(props: {
  searchValue: string
  cuisine?: string
  tag?: string
  ingredient?: string
}) {
  const {
    data: recipes,
    isError,
    isLoading,
  } = useSupabaseQuery(searchRecipes, props)
  const [render, setRender] = useState<number>(0)

  return (
    <>
      {recipes?.map((r, index) => (
        <Link href={`/recipes/${r.id}`} key={r.id + render}>
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
              <RecipePrice id={r.id} />
            </div>
          </div>
        </Link>
      ))}
    </>
  )
}
