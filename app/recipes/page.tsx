import { Suspense } from "react"

import { getAllIngredients } from "@/lib/supabase"
import { Alert } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
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
      <Suspense
        fallback={
          <div>
            <Skeleton className="h-full w-full" />
          </div>
        }
      >
        {/* @ts-expect-error Async Server Component */}
        <SearchToolbar />
      </Suspense>

      <div className="grid grid-cols-5 gap-6 my-4">
        <Suspense
          fallback={
            <div className="grid grid-cols-5 gap-6 my-4">
              <div className="space-y-3 transition-all animate-fade-in">
                <div className="overflow-hidden rounded-md aspect-square relative">
                  <Skeleton className="h-full w-full" />
                </div>
                <div className="space-y-1">
                  <Skeleton className="w-11/12 h-6" />
                  <Skeleton className="w-8/12 h-6 " />
                </div>
              </div>
              <div className="space-y-3 transition-all animate-fade-in">
                <div className="overflow-hidden rounded-md aspect-square relative">
                  <Skeleton className="h-full w-full" />
                </div>
                <div className="space-y-1">
                  <Skeleton className="w-11/12 h-6" />
                  <Skeleton className="w-8/12 h-6 " />
                </div>
              </div>
              <div className="space-y-3 transition-all animate-fade-in">
                <div className="overflow-hidden rounded-md aspect-square relative">
                  <Skeleton className="h-full w-full" />
                </div>
                <div className="space-y-1">
                  <Skeleton className="w-11/12 h-6" />
                  <Skeleton className="w-8/12 h-6 " />
                </div>
              </div>
              <div className="space-y-3 transition-all animate-fade-in">
                <div className="overflow-hidden rounded-md aspect-square relative">
                  <Skeleton className="h-full w-full" />
                </div>
                <div className="space-y-1">
                  <Skeleton className="w-11/12 h-6" />
                  <Skeleton className="w-8/12 h-6 " />
                </div>
              </div>
              <div className="space-y-3 transition-all animate-fade-in">
                <div className="overflow-hidden rounded-md aspect-square relative">
                  <Skeleton className="h-full w-full" />
                </div>
                <div className="space-y-1">
                  <Skeleton className="w-11/12 h-6" />
                  <Skeleton className="w-8/12 h-6 " />
                </div>
              </div>
            </div>
          }
        >
          {/* @ts-expect-error Async Server Component */}
          <RecipesList
            searchValue={searchValue}
            tag={tag}
            cuisine={cuisine}
            ingredient={ingredient}
          />
        </Suspense>
      </div>
      {/* <CategoryNav /> */}
    </>
  )
}
