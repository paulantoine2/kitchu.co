import { Suspense } from "react"

import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyP,
} from "@/components/ui/typography"
import { ImportDialog } from "@/components/layout/import-dialog"
import Search from "@/components/layout/search"
import RecipeForm from "@/components/recipe/recipe-form"
import { RecipesList } from "@/components/recipes-list"
import { SearchToolbar } from "@/components/search-toolbar"

export default async function CreateRecipePage() {
  return (
    <div>
      <TypographyH2 className="my-12">Créer une nouvelle recette</TypographyH2>
      <RecipeForm />
    </div>
  )
}
