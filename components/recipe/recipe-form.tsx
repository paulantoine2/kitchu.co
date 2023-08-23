"use client"

import React from "react"
import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"

import { Cuisine, Ingredient } from "@/types/data"
import { cn } from "@/lib/utils"
import { recipeIngredientSchema, recipeSchema } from "@/lib/validations/recipe"
import { useSupabase } from "@/app/supabase-provider"

import { Icons } from "../icons"
import IngredientListItem from "../ingredient-list-item"
import { Button } from "../ui/button"
import { Card } from "../ui/card"
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
import { TypographyLead, TypographyMuted } from "../ui/typography"

type FormData = z.infer<typeof recipeSchema>
type IngredientFormData = z.infer<typeof recipeIngredientSchema>

export default function RecipeForm() {
  const { supabase } = useSupabase()
  const form = useForm<FormData>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      cuisine: undefined,
      name: "",
      ingredients: [{ ingredient_id: "", amount: 100, unit: "g" }],
      steps: [{ instructionsMarkdown: "" }],
    },
  })
  const ingredientsFieldArray = useFieldArray({
    control: form.control,
    name: "ingredients",
  })

  const stepsFieldArray = useFieldArray({
    control: form.control,
    name: "steps",
  })

  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const [ingredients, setIngredients] = React.useState<Ingredient[]>([])
  React.useEffect(() => {
    async function getItems() {
      const res = await supabase.from("ingredient").select("*")
      if (res.data) setIngredients(res.data)
    }

    getItems()
  }, [])

  function onSubmit(values: FormData) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  function renderImage(id: string) {
    console.log({ id })
    return (
      <Image
        key={id}
        src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/ingredient/${id}.png`}
        alt={"ingredient"}
        width={100}
        height={100}
        className="object-cover"
        placeholder="empty"
      />
    )
  }

  return (
    <Form {...form}>
      <form
        id="recipe-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
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
        <FormField
          control={form.control}
          name="cuisine"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Cuisine</FormLabel>
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
                render={({ field }) => (
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
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="w-[100px] rounded-l-none">
                                  <SelectValue placeholder="Unit" />
                                </SelectTrigger>
                              </FormControl>
                              {/* @todo Dynamic unit based on ingredient */}
                              <SelectContent>
                                <SelectItem value="g">g</SelectItem>
                                <SelectItem value="p">pièce(s)</SelectItem>
                                <SelectItem value="l">l</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        disabled={ingredientsFieldArray.fields.length === 1}
                        variant="ghost"
                        size="icon"
                        type="button"
                        onClick={() => ingredientsFieldArray.remove(index)}
                      >
                        <Icons.trash className="h-4 w-4" />
                      </Button>
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
                          <Icons.trash className="h-4 w-4" />
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
        <Button type="submit">Créer</Button>
      </form>
    </Form>
  )
}

function CuisinesPopover({
  selectedValue,
  onSelect,
}: {
  selectedValue: string
  onSelect: (value: string) => void
}) {
  const [loading, setLoading] = React.useState(false)
  const [items, setItems] = React.useState<Cuisine[]>([])
  const { supabase } = useSupabase()

  React.useEffect(() => {
    async function getItems() {
      setLoading(true)
      const res = await supabase.from("cuisine").select("*")
      if (res.data) setItems(res.data)
      setLoading(false)
    }

    getItems()
  }, [])

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
  onSelect,
}: {
  data: Ingredient[]
  selectedValue: string
  onSelect: (value: string) => void
}) {
  const items = data
  const [open, setOpen] = React.useState(false)
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
              // selectedValue && "pl-0"
            )}
          >
            {selectedValue && (
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
            <span className="flex-1 text-left pl-6">
              {selectedValue
                ? items.find((item) => item.id === selectedValue)?.name
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
          <CommandGroup className="h-[350px] overflow-y-auto">
            {items.map((item) => (
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
