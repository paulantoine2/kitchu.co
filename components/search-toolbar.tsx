import { supabase } from "@/lib/supabase"

import { SearchFilter } from "./search-filter"

export async function SearchToolbar() {
  return (
    <div className="my-4 gap-4 flex">
      <TagFilter />
      <CuisineFilter />
      <IngredientFilter />
    </div>
  )
}

async function TagFilter() {
  const { data, error } = await supabase
    .from("tag")
    .select("*")
    .order("name", { ascending: true })

  if (!data) return

  return (
    <SearchFilter
      name="tag"
      options={data.map((t) => ({ label: t.name, value: t.id }))}
      title="Tags"
    />
  )
}

async function CuisineFilter() {
  const { data, error } = await supabase
    .from("cuisine")
    .select("*")
    .order("name", { ascending: true })

  if (!data) return

  return (
    <SearchFilter
      name="cuisine"
      options={data.map((t) => ({ label: t.name, value: t.id }))}
      title="Cuisines"
    />
  )
}

async function IngredientFilter() {
  const { data, error } = await supabase
    .from("ingredient")
    .select("*")
    .order("name", { ascending: true })

  if (!data) return

  return (
    <SearchFilter
      name="ingredient"
      options={data.map((t) => ({ label: t.name, value: t.id }))}
      title="Ingredients"
    />
  )
}
