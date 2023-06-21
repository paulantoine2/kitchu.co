"use client"

import { useMemo } from "react"
import { Session } from "@supabase/supabase-js"

import { getRecipePrice } from "@/lib/supabase"
import { useSupabaseQuery } from "@/hooks/useSupabaseQuery"
import { useSupabase } from "@/app/supabase-provider"

import { Badge } from "./ui/badge"

type RecipePrice = {
  id: string
}

export function RecipePrice({ id }: RecipePrice) {
  const { session } = useSupabase()
  const salepoint_id = session?.user.user_metadata.market_salepoint?.id

  if (!salepoint_id)
    return (
      <p className="text-sm font-medium truncate text-red-500">
        Prix indisponible
      </p>
    )

  return <Price salepoint_id={salepoint_id} id={id} />
}

function Price(props: { salepoint_id: number; id: string }) {
  const { data, isError } = useSupabaseQuery(getRecipePrice, props)

  const price = useMemo(() => {
    const result = {
      total: 0,
      unavailable: 0,
    }
    if (!data) return null
    for (const q of data) {
      const price_kg =
        q.ingredient?.market_product[0]?.market_product_price[0]?.price_kg

      /** @todo test that q.unit is g or kg, convert otherwise */
      if (!q.amount) continue

      if (!price_kg) {
        result.unavailable++
        continue
      }
      result.total += (q.amount / 1000) * price_kg
    }
    return result
  }, [data])

  if (!price)
    return (
      <p className="text-sm font-medium truncate text-red-500">
        Prix indisponible
      </p>
    )
  if (price.unavailable > 0)
    return (
      <p className="text-sm font-medium truncate text-red-500">
        {price.unavailable} ingrédients indisponible(s)
      </p>
    )
  return (
    <p className="text-sm font-medium truncate">
      {(price.total / 2).toFixed(2)}
      {" €"}
      <span className="text-muted-foreground font-normal">/ personne</span>
    </p>
  )
}
