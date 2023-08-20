import { Suspense } from "react"

import { TypographyH1 } from "@/components/ui/typography"
import { ImportDialog } from "@/components/layout/import-dialog"
import Search from "@/components/layout/search"
import RecipeForm from "@/components/recipe/recipe-form"
import { RecipesList } from "@/components/recipes-list"
import { SearchToolbar } from "@/components/search-toolbar"

export default async function CreateRecipePage() {
  return (
    <>
      <TypographyH1>Nouvelle recette</TypographyH1>
      <RecipeForm />
    </>
  )
}
