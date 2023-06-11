import { getAllIngredients } from "@/lib/supabase"
import { Alert } from "@/components/ui/alert"
import CategoryNav from "@/components/category-nav"
import IngredientsFilter from "@/components/ingredients-filter"
import { ImportDialog } from "@/components/layout/import-dialog"
import Search from "@/components/layout/search"
import { RecipesList } from "@/components/recipes-list"
import { SearchToolbar } from "@/components/search-toolbar"

export default async function RecipesPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const {
    tag,
    cuisine,
    ingredient,
    q: searchValue,
  } = searchParams as {
    [key: string]: string
  }

  return (
    <>
      <div className="flex space-x-4 w-full">
        <Search />
        <ImportDialog />
      </div>
      {/* @ts-expect-error Async Server Component */}
      <SearchToolbar />
      <div className="grid grid-cols-5 gap-6 my-4">
        <RecipesList
          searchValue={searchValue}
          tag={tag}
          cuisine={cuisine}
          ingredient={ingredient}
        />
      </div>
      {/* <CategoryNav /> */}
    </>
  )
}
