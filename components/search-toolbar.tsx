import { getAllCuisines, getAllIngredients, getAllTags } from "@/lib/supabase"
import { createServerSupabaseClient } from "@/lib/supabase-server-client"

import { SearchFilter } from "./search-filter"

export async function SearchToolbar() {
  const supabase = createServerSupabaseClient()
  const { data: tags, error: tagsError } = await getAllTags(supabase)
  const { data: cuisines, error: cuisinesError } = await getAllCuisines(
    supabase
  )
  const { data: ingredients, error: ingredientError } = await getAllIngredients(
    supabase
  )

  return (
    <div className="my-4 gap-4 flex">
      {!tagsError && (
        <SearchFilter
          name="tag"
          options={tags.map((t) => ({ label: t.name, value: t.id }))}
          title="Tags"
        />
      )}
      {!cuisinesError && (
        <SearchFilter
          name="cuisine"
          options={cuisines.map((t) => ({ label: t.name, value: t.id }))}
          title="Cuisines"
        />
      )}
      {!ingredientError && (
        <SearchFilter
          name="ingredient"
          options={ingredients.map((t) => ({ label: t.name, value: t.id }))}
          title="Ingredients"
        />
      )}
    </div>
  )
}
