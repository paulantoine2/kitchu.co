"use client"

import React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
// import { DevTool } from "@hookform/devtools"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"

import { Cuisine, Ingredient, Tag } from "@/types/data"
import { cn } from "@/lib/utils"
import { recipeSchema } from "@/lib/validations/recipe"
import { useSupabase } from "@/app/supabase-provider"

import { Icons } from "../icons"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Textarea } from "../ui/textarea"
import { TypographyP } from "../ui/typography"

type FormData = z.infer<typeof recipeSchema>

export function ImportRecipeFormContainer() {
  const [data, setData] = React.useState<FormData>()

  if (!data) return <ImportRecipeForm onData={setData} />

  return (
    <>
      <Alert className="mb-2" variant="warn">
        <Icons.review className="h-4 w-4" />
        <AlertTitle>Vérification</AlertTitle>
        <AlertDescription>
          Veuillez vérifier si les informations importées sont les bonnes avant
          de valider le formulaire
        </AlertDescription>
      </Alert>
      <RecipeForm defaultValues={data} />
    </>
  )
}

function ImportRecipeForm({ onData }: { onData: (data: FormData) => void }) {
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState("")

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    setLoading(true)
    setError("")
    e.preventDefault()

    const val = e.target as HTMLFormElement
    const url = val.url as HTMLInputElement

    const response = await fetch("/api/import-recipe", {
      method: "POST",
      body: JSON.stringify({ url: url.value }),
    })

    setLoading(false)

    if (!response.ok) {
      if (response.status === 400) setError("Invalid URL.")
      if (response.status === 500)
        setError("Something went wrong. Try again later.")
    } else {
      const body = await response.json()

      console.log(body)

      onData(body)
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <TypographyP className="mb-2">
        Copier / Coller le lien d&apos;une recette des sites supportés.
      </TypographyP>
      <Input
        name="url"
        // value="https://www.hellofresh.fr/recipes/mafe-revisite-au-poulet-and-carotte-64073d979c6d10cd16eab751"
        autoComplete="off"
        className="mb-6"
      />
      {error && (
        <p className="text-sm font-medium leading-none text-destructive">
          {error}
        </p>
      )}

      {loading ? (
        <Button disabled>
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          Veuillez patienter...
        </Button>
      ) : (
        <Button type="submit">Importer</Button>
      )}
    </form>
  )
}

export function RecipeForm({ defaultValues }: { defaultValues?: FormData }) {
  const { supabase } = useSupabase()
  const router = useRouter()
  const form = useForm<FormData>({
    resolver: zodResolver(recipeSchema),
    defaultValues: defaultValues || {
      ingredients: [
        { amount: undefined, ingredient_id: undefined, unit: undefined },
      ],
      name: "",
      difficulty: 0,
      steps: [{ instructionsMarkdown: "" }],
      tags: [],
    },
  })

  const tagsFieldArray = useFieldArray({
    control: form.control,
    name: "tags",
  })

  const ingredientsFieldArray = useFieldArray({
    control: form.control,
    name: "ingredients",
  })

  const stepsFieldArray = useFieldArray({
    control: form.control,
    name: "steps",
  })

  const [isSaving, setIsSaving] = React.useState<boolean>(false)

  const [ingredients, setIngredients] = React.useState<Ingredient[]>([])
  const [tags, setTags] = React.useState<Tag[]>([])
  React.useEffect(() => {
    supabase
      .from("ingredient")
      .select("*")
      .then((res) => {
        if (res.data) setIngredients(res.data)
      })
    supabase
      .from("tag")
      .select("*")
      .then((res) => {
        if (res.data) setTags(res.data)
      })
  }, [supabase])

  async function onSubmit(values: FormData) {
    setIsSaving(true)

    const response = await fetch(`/api/recipes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })

    setIsSaving(false)

    if (!response?.ok) {
      return alert("error")
    }

    const body = await response.json()

    router.push(`/recipes/${body.uuid}`)
  }

  return (
    <Form {...form}>
      {/* <DevTool control={form.control} /> */}
      <form
        id="recipe-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>

              <FormControl>
                <Input placeholder="Boeuf bourgignon" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col items-start gap-2">
          <FormLabel>Tags</FormLabel>
          <div className="flex gap-2">
            {tagsFieldArray.fields.map((field, index) => {
              return (
                <FormField
                  key={field.id}
                  control={form.control}
                  name={`tags.${index}.id`}
                  render={({ field }) => (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => tagsFieldArray.remove(index)}
                    >
                      {tags.find((tag) => tag.id === field.value)?.name}
                      <Icons.close className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                />
              )
            })}
          </div>

          <TagsPopover
            tags={tags}
            onSelect={(id) => {
              const index = form
                .getValues()
                .tags.findIndex((tag) => tag.id === id)
              console.log(index, id)
              if (index >= 0) tagsFieldArray.remove(index)
              else tagsFieldArray.append({ id })
            }}
            selectedValues={form.getValues().tags.map((tag) => tag.id)}
          />
        </div>

        <FormField
          control={form.control}
          name="difficulty"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Niveau de difficulté</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(+value)}
                defaultValue={field.value + ""}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="0">Non défini</SelectItem>
                  <SelectItem value="1">Facile</SelectItem>
                  <SelectItem value="2">Intermédiaire</SelectItem>
                  <SelectItem value="3">Difficile</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="prep_duration_min"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Durée de préparation</FormLabel>
              <div className="flex">
                <FormControl>
                  <Input
                    className="w-[100px] rounded-r-none"
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(+e.target.value)}
                  />
                </FormControl>
                <div className="flex h-10 rounded-md border border-input bg-secondary px-3 py-2 text-sm ring-offset-background rounded-l-none border-l-0">
                  minutes
                </div>
              </div>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cuisine"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Type de cuisine</FormLabel>
              <CuisinesPopover
                selectedValue={field.value}
                onSelect={(id) => field.onChange(id)}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          {ingredientsFieldArray.fields.map((field, index) => {
            return (
              <FormField
                key={field.id}
                control={form.control}
                name={`ingredients.${index}`}
                render={({ field: rootField }) => (
                  <FormItem className="flex-1">
                    <FormLabel className={cn(index !== 0 && "sr-only")}>
                      Ingrédients
                    </FormLabel>
                    <FormDescription className={cn(index !== 0 && "sr-only")}>
                      Sélectionnez les ingrédients nécessaires à la préparation
                      de cette recette et leur quantité par personne
                    </FormDescription>
                    <div className="flex flex-row">
                      <FormField
                        control={form.control}
                        name={`ingredients.${index}.ingredient_id`}
                        render={({ field }) => (
                          <FormItem className="mr-2">
                            <IngredientPopover
                              data={ingredients}
                              selectedValue={field.value}
                              selectedValues={form
                                .getValues()
                                .ingredients.map((ingr) => ingr.ingredient_id)}
                              onSelect={field.onChange}
                            />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`ingredients.${index}.amount`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input
                                placeholder="Quantité"
                                type="number"
                                className="rounded-r-none border-r-0"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(+e.target.value)
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`ingredients.${index}.unit`}
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <Select
                              disabled={!rootField.value.ingredient_id}
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="w-[150px] rounded-none z-10">
                                  <SelectValue placeholder="Unité" />
                                </SelectTrigger>
                              </FormControl>
                              {/* @todo Dynamic unit based on ingredient */}
                              <SelectContent>
                                <SelectItem value="g">g</SelectItem>
                                <SelectItem value="pièce(s)">
                                  pièce(s)
                                </SelectItem>
                                <SelectItem value="l">l</SelectItem>
                                <SelectItem value="cs">Cuil. soupe</SelectItem>
                                <SelectItem value="cc">Cuil. café</SelectItem>
                                <SelectItem value="tranche(s)">
                                  tranche(s)
                                </SelectItem>
                                <SelectItem value="pincée(s)">
                                  pincée(s)
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex h-10 rounded-md border border-input bg-secondary px-3 py-2 text-sm ring-offset-background rounded-l-none border-l-0">
                        / personne
                      </div>

                      <Button
                        disabled={ingredientsFieldArray.fields.length === 1}
                        variant="ghost"
                        size="icon"
                        type="button"
                        onClick={() => ingredientsFieldArray.remove(index)}
                      >
                        <Icons.close className="h-4 w-4" />
                      </Button>
                    </div>
                  </FormItem>
                )}
              />
            )
          })}
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="mt-2"
            onClick={() =>
              ingredientsFieldArray.append(
                {
                  ingredient_id: "",
                  amount: 100,
                  unit: "g",
                },
                {
                  shouldFocus: false,
                }
              )
            }
          >
            <Icons.add className="h-4 w-4 mr-2" />
            Ajouter un ingrédient
          </Button>
        </div>

        <div>
          {stepsFieldArray.fields.map((field, index) => {
            return (
              <FormField
                key={field.id}
                control={form.control}
                name={`steps.${index}.instructionsMarkdown`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className={cn(index !== 0 && "sr-only")}>
                      Instructions
                    </FormLabel>
                    <FormDescription className={cn(index !== 0 && "sr-only")}>
                      Rédigez les instructions à suivre pour préparer cette
                      recette
                    </FormDescription>
                    <div className="flex space-x-2">
                      <FormControl>
                        <Textarea
                          placeholder="Ciseler les oignons..."
                          {...field}
                        />
                      </FormControl>
                      <div className="flex flex-col space-y-1">
                        <Button
                          disabled={index === 0}
                          variant="outline"
                          size="icon"
                          type="button"
                          onClick={() => stepsFieldArray.swap(index, index - 1)}
                        >
                          <Icons.cheup className="h-4 w-4" />
                        </Button>
                        <Button
                          disabled={index === stepsFieldArray.fields.length - 1}
                          variant="outline"
                          size="icon"
                          type="button"
                          onClick={() => stepsFieldArray.swap(index, index + 1)}
                        >
                          <Icons.chedown className="h-4 w-4" />
                        </Button>
                        <Button
                          disabled={stepsFieldArray.fields.length === 1}
                          variant="ghost"
                          size="icon"
                          type="button"
                          onClick={() => stepsFieldArray.remove(index)}
                        >
                          <Icons.close className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )
          })}
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="mt-2"
            onClick={() => stepsFieldArray.append({ instructionsMarkdown: "" })}
          >
            <Icons.add className="h-4 w-4 mr-2" />
            Ajouter une étape
          </Button>
        </div>
        <FormField
          control={form.control}
          name="is_public"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-sm border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Partager publiquement la recette</FormLabel>
                <FormDescription>
                  Faites profiter de votre recette avec la communauté Kitchu !
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <Button type="submit">
          {isSaving && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Créer
        </Button>
      </form>
    </Form>
  )
}
function TagsPopover({
  selectedValues,
  tags,
  onSelect,
}: {
  selectedValues: string[]
  tags: Tag[]
  onSelect: (value: string) => void
}) {
  const items = tags

  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button variant="secondary" role="combobox">
            <Icons.add className="w-4 h-4 mr-2" />
            Ajouter un tag
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Rechercher des tags..." />
          <CommandEmpty>Aucun tag trouvé.</CommandEmpty>
          <CommandGroup>
            {items.map((item) => (
              <CommandItem
                value={item.name}
                key={item.id}
                onSelect={() => {
                  onSelect(item.id)
                }}
              >
                <Icons.check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedValues.includes(item.id)
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                {item.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
function CuisinesPopover({
  selectedValue,
  onSelect,
}: {
  selectedValue: string | undefined
  onSelect: (value: string | undefined) => void
}) {
  const [loading, setLoading] = React.useState(false)
  const [items, setItems] = React.useState<Cuisine[]>([])
  const { supabase } = useSupabase()

  React.useEffect(() => {
    supabase
      .from("cuisine")
      .select("*")
      .then((res) => {
        if (res.data) setItems(res.data)
      })
  }, [supabase])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "w-[300px] justify-between",
              !selectedValue && "text-muted-foreground"
            )}
          >
            {selectedValue
              ? items.find((item) => item.id === selectedValue)?.name
              : "Selectionner une cuisine"}
            <Icons.chedown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Rechercher des cuisines..." />
          <CommandEmpty>Aucune cuisine trouvée.</CommandEmpty>
          <CommandGroup>
            <CommandItem
              onSelect={() => {
                onSelect(undefined)
              }}
            >
              <Icons.check
                className={cn(
                  "mr-2 h-4 w-4",
                  undefined === selectedValue ? "opacity-100" : "opacity-0"
                )}
              />
              Aucune
            </CommandItem>
            {items.map((item) => (
              <CommandItem
                value={item.name}
                key={item.id}
                onSelect={() => {
                  onSelect(item.id)
                }}
              >
                <Icons.check
                  className={cn(
                    "mr-2 h-4 w-4",
                    item.id === selectedValue ? "opacity-100" : "opacity-0"
                  )}
                />
                {item.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
function IngredientPopover({
  data,
  selectedValue,
  selectedValues,
  onSelect,
}: {
  data: Ingredient[]
  selectedValue: string | undefined
  selectedValues: string[]
  onSelect: (value: string) => void
}) {
  const items = data
  const [open, setOpen] = React.useState(false)

  // Specific value to warn of no matching item found on recipe import
  const isNoMatch = selectedValue?.startsWith("NOMATCH")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "w-[350px] justify-start relative",
              !selectedValue && "text-muted-foreground"
            )}
          >
            {isNoMatch && <Icons.warn className="text-red-500 w-5 h-5" />}
            {selectedValue && !isNoMatch && (
              <div className="overflow-hidden rounded-full aspect-square absolute w-10 h-10 p-1 mr-1 left-0">
                <Image
                  src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/ingredient/${selectedValue}.png`}
                  alt={"ingredient"}
                  width={100}
                  height={100}
                  className="object-cover"
                  placeholder="empty"
                />
              </div>
            )}
            <span
              className={cn(
                "flex-1 text-left pl-6",
                isNoMatch && "text-red-500"
              )}
            >
              {selectedValue
                ? isNoMatch
                  ? selectedValue.split("_")[1]
                  : items.find((item) => item.id === selectedValue)?.name
                : "Selectionner un ingrédient"}
            </span>

            <Icons.chedown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-[350px] p-0">
        <Command>
          <CommandInput placeholder="Rechercher des ingrédients..." />
          <CommandEmpty>Aucun ingrédient trouvée.</CommandEmpty>
          <CommandGroup className="max-h-[350px] overflow-y-auto">
            {items
              .filter((item) => !selectedValues.includes(item.id))
              .map((item) => (
                <CommandItem
                  value={item.name}
                  key={item.id}
                  onSelect={() => {
                    onSelect(item.id)
                    setOpen(false)
                  }}
                >
                  <Icons.check
                    className={cn(
                      "mr-2 h-4 w-4",
                      item.id === selectedValue ||
                        selectedValues.includes(item.id)
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  <div className="overflow-hidden aspect-square w-6 h-6 mr-2">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/ingredient/${item.id}.png`}
                      alt={"ingredient"}
                      width={100}
                      height={100}
                      className="object-cover"
                      placeholder="empty"
                    />
                  </div>
                  {item.name}
                </CommandItem>
              ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
