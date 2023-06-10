import { getAllCuisines, getAllIngredients, getAllTags } from "@/lib/supabase"

import { SearchFilter } from "./search-filter"

export async function SearchToolbar() {
  const { data: tags, error: tagsError } = await getAllTags()
  const { data: cuisines, error: cuisinesError } = await getAllCuisines()
  const { data: ingredients, error: ingredientError } =
    await getAllIngredients()

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
