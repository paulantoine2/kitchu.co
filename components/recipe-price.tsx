import { cache } from "react"

import { makeSupabase, supabase } from "@/lib/supabase"
import { createServerSupabaseClient } from "@/lib/supabase-server-client"

import { TypographyLarge, TypographyMuted } from "./ui/typography"

type RecipePrice = {
  id: string
  persons: number
}

export async function RecipePrice({ id, persons = 2 }: RecipePrice) {
  const session = await createServerSupabaseClient().auth.getSession()

  const salepoint_id =
    session?.data?.session?.user.user_metadata?.market_salepoint?.id ||
    undefined

  if (!salepoint_id)
    return (
      <p className="text-sm font-medium truncate text-red-500">
        Prix indisponible
      </p>
    )

  const { data } = await makeSupabase({ cache: "force-cache" })
    .from("quantity")
    .select(
      "amount,unit,ingredient(id,name,market_product(*,market_product_price!inner(*)))"
    )
    .eq("recipe_id", id)
    .eq(
      "ingredient.market_product.market_product_price.salepoint_id",
      salepoint_id
    )

  let averagePricePerPerson = 0,
    unavailableProducts = 0,
    productTotalSalePrice = 0,
    productPricePerPerson = 0
  if (!data) return
  for (const q of data) {
    const price_kg =
      q.ingredient?.market_product[0]?.market_product_price[0]?.price_kg

    const sale_price =
      q.ingredient?.market_product[0]?.market_product_price[0]?.sale_price
    const sale_unit = q.ingredient?.market_product[0]?.sale_unit
    const sale_volume = q.ingredient?.market_product[0]?.sale_volume

    /** @todo test that q.unit is g or kg, convert otherwise */

    if (!q.amount) continue

    if (!price_kg || !sale_price || !sale_volume || !sale_unit) {
      unavailableProducts++
      continue
    }

    const amount = (q.amount / 2) * persons

    const quantity_to_buy = Math.ceil(amount / sale_volume)

    productTotalSalePrice += sale_price * quantity_to_buy
    productPricePerPerson += (sale_price * quantity_to_buy) / persons
    averagePricePerPerson += ((amount / 1000) * price_kg) / persons
  }

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
    <>
      <TypographyLarge>{averagePricePerPerson.toFixed(2)} €</TypographyLarge>
      <TypographyMuted>/ personne</TypographyMuted>
    </>
  )
}
