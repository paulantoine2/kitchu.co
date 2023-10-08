import { TypographyH1 } from "@/components/ui/typography"
import { RecipeForm } from "@/components/recipe/recipe-form"

export default async function NewRecipePage() {
  return (
    <div>
      <div className="my-12">
        <TypographyH1>Créer une nouvelle recette</TypographyH1>
      </div>
      <RecipeForm />
    </div>
  )
}
