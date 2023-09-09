export type Salepoint = {
  category: string
  id: string
  name: string
  rating_average: number | null
  rating_count: number
}

export type Ingredient = {
  id: number
  name: string
}

export type Tag = {
  id: string
  name: string
}

export type Cuisine = {
  icon: string | null
  id: string
  name: string
}

export type Quantity = {
  ingredient: Ingredient | null
  amount: number | null
  unit: string
}

export type Step = {
  index: number
  instructionsMarkdown: string
  images: string[]
  videos: string[]
}

export type Recipe = {
  id: number
  name: string
  ingredient: Ingredient[]
  steps: Step[]
}
