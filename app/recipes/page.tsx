import { Recipes, searchRecipes, supabase } from "@/lib/supabase"
import { Alert } from "@/components/ui/alert"
import { RecipesList } from "@/components/recipes-list"

export const revalidate = 0

export default async function RecipesPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const { cat: category, q: searchValue } = searchParams as {
    [key: string]: string
  }

  const {
    count,
    data: items,
    error,
    status,
    statusText,
  } = await searchRecipes({ searchValue, category })

  if (error) return <Alert>{error.message}</Alert>

  return (
    <>
      {items.length > 0 ? (
        <div
          key={searchValue + category}
          className="grid grid-cols-5 gap-6 my-4"
        >
          <RecipesList recipes={items} />
        </div>
      ) : (
        <h1>No results</h1>
      )}
    </>
  )
}
