import { TypographyH1, TypographyLead } from "@/components/ui/typography"
import { ImportRecipeFormContainer } from "@/components/recipe/recipe-form"

export default async function ImportRecipePage() {
  return (
    <div>
      <div className="my-12">
        <TypographyH1>Importer une recette</TypographyH1>
      </div>
      <ImportRecipeFormContainer />
    </div>
  )
}
