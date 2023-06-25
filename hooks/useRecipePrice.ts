import { useMemo } from "react"

import { getRecipePrice } from "@/lib/supabase"

import { useSupabaseQuery } from "./useSupabaseQuery"

export function useRecipePrice(props: {
  salepoint_id: number
  id: string
  persons: number
}) {
  const { data, isError } = useSupabaseQuery(getRecipePrice, props)

  const result = useMemo(() => {
    const result = {
      averagePricePerPerson: 0,
      unavailableProducts: 0,
      productTotalSalePrice: 0,
      productPricePerPerson: 0,
    }
    if (!data) return result
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
        result.unavailableProducts++
        continue
      }

      const amount = (q.amount / 2) * props.persons

      const quantity_to_buy = Math.ceil(amount / sale_volume)

      result.productTotalSalePrice += sale_price * quantity_to_buy
      result.productPricePerPerson +=
        (sale_price * quantity_to_buy) / props.persons
      result.averagePricePerPerson +=
        ((amount / 1000) * price_kg) / props.persons
    }
    return result
  }, [data, props.persons])

  console.log(result)

  return result
}
