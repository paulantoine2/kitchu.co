import { Suspense } from "react"

import Search from "@/components/layout/search"
import { RecipesList } from "@/components/recipes-list"
import { SearchToolbar } from "@/components/search-toolbar"

export default async function RecipesPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const { ingredient, q: searchValue } = searchParams as {
    [key: string]: string
  }

  return (
    <div className="container my-8">
      <SearchToolbar />
      <div className="grid grid-cols-3 gap-8 my-4">
        <Suspense>
          <RecipesList searchValue={searchValue} ingredient={ingredient} />
        </Suspense>
      </div>
    </div>
  )
}
