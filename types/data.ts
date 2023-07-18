export type Salepoint = {
  category: string
  id: string
  name: string
  rating_average: number | null
  rating_count: number
}

export type Ingredient = {
  id: string
  name: string
}

export type Quantity = {
  ingredient: Ingredient | null
  amount: number | null
  unit: string
}
