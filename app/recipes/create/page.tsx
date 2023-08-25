import { Suspense } from "react"

import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyLead,
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
      <div className="my-12">
        <TypographyH1>Créer une nouvelle recette</TypographyH1>
        <TypographyLead>Ou importez depuis un autre site</TypographyLead>
      </div>
      <RecipeForm />
    </div>
  )
}
