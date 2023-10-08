import { Database } from "@/lib/database.types"

export type Salepoint = {
  category: string
  id: string
  name: string
  rating_average: number | null
  rating_count: number
}

export type Ingredient = Database["public"]["Tables"]["ingredient"]["Row"]

export type Tag = {
  id: string
  name: string
}

export type Cuisine = {
  icon: string | null
  id: string
  name: string
}

export type RecipeIngredient =
  Database["public"]["Tables"]["recipe_ingredient"]["Row"]

export type Step = {
  index: number
  instructionsMarkdown: string
  images: string[]
  videos: string[]
}

export type Recipe = Database["public"]["Tables"]["recipe"]["Row"]

export type Unit = Database["public"]["Tables"]["unit"]["Row"]

export type FridgeIngredient = {
  quantity: number
  unit: {
    id: number
    short_name: string
  }
  ingredient: {
    category: string
    id: number
    name: string
  }
}

export type Fridge = {
  items: FridgeIngredient[]
}
