"use client"

import { useMemo } from "react"
import { Session } from "@supabase/supabase-js"

import { getRecipePrice } from "@/lib/supabase"
import { useRecipePrice } from "@/hooks/useRecipePrice"
import { useSupabaseQuery } from "@/hooks/useSupabaseQuery"
import { useSupabase } from "@/app/supabase-provider"

import { Badge } from "./ui/badge"

type RecipePrice = {
  id: string
  persons: number
}

export function RecipePrice({ id, persons = 2 }: RecipePrice) {
  const { session } = useSupabase()
  const salepoint_id = session?.user.user_metadata.market_salepoint?.id

  if (!salepoint_id)
    return (
      <p className="text-sm font-medium truncate text-red-500">
        Prix indisponible
      </p>
    )

  return <Price salepoint_id={salepoint_id} id={id} persons={persons} />
}

function Price(props: { salepoint_id: number; id: string; persons: number }) {
  const { averagePricePerPerson, productTotalSalePrice, unavailableProducts } =
    useRecipePrice(props)

  if (!averagePricePerPerson)
    return (
      <p className="text-sm font-medium truncate text-red-500">
        Prix indisponible
      </p>
    )
  if (unavailableProducts > 0)
    return (
      <p className="text-sm font-medium truncate text-red-500">
        {unavailableProducts} ingrédients indisponible(s)
      </p>
    )
  return (
    <p className="text-sm font-medium truncate">
      {averagePricePerPerson.toFixed(2)}
      {" €"}
      <span className="text-muted-foreground font-normal">/ personne</span>
    </p>
  )
}
