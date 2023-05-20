import Image from "next/image"

import { Recipes, searchRecipes, supabase } from "@/lib/supabase"
import { Alert } from "@/components/ui/alert"
import { RecipesList } from "@/components/recipes-list"

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const { sort, q: searchValue } = searchParams as { [key: string]: string }

  const { count, data, error, status, statusText } = await searchRecipes(
    searchValue
  )

  if (error) return <Alert>{error.message}</Alert>

  return (
    <div className="container">
      {data.length > 0 && (
        <div key={searchValue} className="grid grid-cols-5 gap-6 my-4">
          <RecipesList recipes={data} />
        </div>
      )}
    </div>
  )
}
