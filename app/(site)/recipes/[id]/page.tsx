import Link from "next/link"
import { notFound } from "next/navigation"
import { RecipeJsonLd } from "next-seo"

import { Step } from "@/types/data"
import markdownToHtml from "@/lib/markDownToHTML"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyMuted,
  TypographyP,
  TypographySmall,
} from "@/components/ui/typography"
import { Icons } from "@/components/icons"
import { IngredientImage } from "@/components/ingredient/ingredient-image"
import PersonsSelector from "@/components/recipe/persons-selector"
import RecipeCard from "@/components/recipe/recipe-card"
import { RecipeImage } from "@/components/recipe/recipe-image"

import PersonsProvider, { IngredientQuantity } from "./persons-provider"

// Return a list of `params` to populate the [id] dynamic segment
export async function generateStaticParams() {
  const { data, error } = await supabase.from("recipe").select(`id`)

  console.log(data, error)

  return (data || []).map(({ id }) => ({
    id: id + "",
  }))
}

async function getRecipe(id: number) {
  const { data, error } = await supabase
    .from("recipe")
    .select(
      `
        *,
        recipe_ingredient (
          quantity,unit(id,short_name),ingredient(id,name,picture_url)
        )
      `
    )
    .eq("id", id)
    .single()

  return data
}

export default async function RecipePage({
  params,
}: {
  params: { id: number }
}) {
  const data = await getRecipe(params.id)

  if (!data) notFound()

  const difficulty = ["Facile", "Intermédiaire", "Avancé"]

  return (
    <PersonsProvider>
      <RecipeJsonLd
        useAppDir
        name={data.name}
        description="Un plat délicieux."
        datePublished="2023-10-08"
        authorName={["Kitchu"]}
        totalTime={`PT${data.prep_time_min}M`}
        yields="2"
        category="Plat principal"
        calories={270}
        images={[data.picture_url || "/recipePlaceholder.svg"]}
        ingredients={data.recipe_ingredient.map(
          (ri) =>
            `${ri.quantity * 2} ${ri.unit?.short_name} ${ri.ingredient?.name}`
        )}
        instructions={(data.steps || []).map((step) => ({
          name: (step as Step).index,
          text: (step as Step).instructionsMarkdown,
        }))}
      />
      <div className="container space-y-8 my-8">
        <div className="flex flex-row gap-16 items-start">
          <div className="relative flex-1 aspect-square rounded-md overflow-hidden">
            <RecipeImage recipe={data} fill className="object-cover bg-muted" />
          </div>
          <div className="space-y-8 w-[40%]">
            <TypographyH1>{data.name}</TypographyH1>
            <div className="grid grid-cols-2">
              {data.difficulty && (
                <div className="flex gap-4 items-center">
                  <Icons.chef />
                  <div className="space-y-1">
                    <TypographyMuted>Difficulté</TypographyMuted>
                    <TypographySmall>
                      {difficulty[data.difficulty - 1]}
                    </TypographySmall>
                  </div>
                </div>
              )}
              {data.prep_time_min && (
                <div className="flex gap-2 items-center">
                  <Icons.clock />
                  <div className="space-y-1">
                    <TypographyMuted>Temps de préparation</TypographyMuted>
                    <TypographySmall>{data.prep_time_min} min</TypographySmall>
                  </div>
                </div>
              )}
            </div>
            <PersonsSelector />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="w-full">
                  <Button className="w-full" size="lg" asChild>
                    <Link href="/">
                      <Icons.cart className="h-5 w-5 mr-3" />
                      Ajouter les ingrédients au panier
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="w-[300px]">
                    Les produits dont vous avez besoin pour préparer cette
                    recette sont automatiquement ajoutés au panier en quantité
                    necessaire en fonction du nombre de personnes, des excès
                    d&apos;ingredients d&aposautres recettes ajoutées, et des
                    ingrédients présents dans votre fridge.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Button className="w-full" size="lg" asChild variant="outline">
              <Link href="/">
                <Icons.love className="h-5 w-5 mr-3" />
                Ajouter aux favoris
              </Link>
            </Button>
          </div>
        </div>
        <Separator />
        <TypographyH2>Ingrédients</TypographyH2>
        <div className="grid grid-cols-4 gap-4">
          {data.recipe_ingredient.map((ri, index) => (
            <div
              key={index}
              className="space-x-3 transition-all animate-fade-in flex items-center"
            >
              {ri.ingredient && (
                <div className="overflow-hidden rounded-md aspect-square relative w-16 h-16">
                  <IngredientImage
                    ingredient={ri.ingredient}
                    width={80}
                    height={80}
                    className="object-cover"
                  />
                </div>
              )}
              <div className="overflow-hidden flex-1">
                <h3 className="text-sm font-medium truncate">
                  {ri.ingredient?.name}
                </h3>
                <IngredientQuantity
                  quantity={ri.quantity}
                  unit={ri.unit?.short_name || ""}
                />
              </div>
            </div>
          ))}
        </div>
        <Separator />
        <TypographyH2>Préparation</TypographyH2>
        {data.steps &&
          data.steps.map((step) => {
            return <StepBody key={(step as Step).index} step={step as Step} />
          })}
        <Separator />
        <TypographyH2>Valeurs nutritionelles</TypographyH2>
        <TypographyP>On y travaille 👀</TypographyP>
        <Separator />
        <TypographyH2>Ces recettes peuvent vous intéresser</TypographyH2>
        <RecipesRecom exclude_id={params.id} />
      </div>
    </PersonsProvider>
  )
}

async function StepBody({ step }: { step: Step }) {
  const content = await markdownToHtml(step?.instructionsMarkdown)

  return (
    <div>
      <TypographyH3 className="mb-4">{step.index + 1}</TypographyH3>
      <div
        className="markdown"
        key={step.index}
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
    </div>
  )
}

async function getRecipesRecom(exclude_id: number) {
  const { data, error } = await supabase
    .from("recipe")
    .select(
      `
        *
      `
    )
    .neq("id", exclude_id)
    .limit(3)

  return data
}

async function RecipesRecom({ exclude_id }: { exclude_id: number }) {
  const recipes = await getRecipesRecom(exclude_id)

  return (
    <div className="grid grid-cols-3 gap-8">
      {recipes?.map((recipe) => (
        <RecipeCard animationDelay={0} key={recipe.id} recipe={recipe} />
      ))}
    </div>
  )
}
