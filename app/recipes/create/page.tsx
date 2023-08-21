import { Suspense } from "react"

import { TypographyH1, TypographyP } from "@/components/ui/typography"
import { ImportDialog } from "@/components/layout/import-dialog"
import Search from "@/components/layout/search"
import RecipeForm from "@/components/recipe/recipe-form"
import { RecipesList } from "@/components/recipes-list"
import { SearchToolbar } from "@/components/search-toolbar"

export default async function CreateRecipePage() {
  return (
    <>
      <div className="flex">
        <div className="w-1/4 ">
          <ul className="mt-4 space-y-2">
            <li>
              <a href="#name">Name</a>
            </li>
            <li>
              <TypographyP>
                <a href="#is_public" className="text-sm lg:text-base leading-7">
                  Public
                </a>
              </TypographyP>
            </li>
            <li>
              <a href="#steps">Steps</a>
            </li>
            <li>
              <a href="#tags">Tags</a>
            </li>
            <li>
              <a href="#cuisine">Cuisine</a>
            </li>
            <li>
              <a href="#ingredients">Ingredients</a>
            </li>
          </ul>
        </div>
        <div className="w-3/4 p-4">
          <TypographyH1>Nouvelle recette</TypographyH1>
          <RecipeForm />
        </div>
      </div>
    </>
  )
}
