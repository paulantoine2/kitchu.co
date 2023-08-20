"use client"

import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"

import { Cuisine, Ingredient } from "@/types/data"
import { cn } from "@/lib/utils"
import { recipeSchema } from "@/lib/validations/recipe"
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
import { TypographyLead, TypographyMuted } from "../ui/typography"

type FormData = z.infer<typeof recipeSchema>

export default function RecipeForm() {
  const { supabase } = useSupabase()
  const form = useForm<FormData>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      cuisine: undefined,
      name: "",
      ingredients: [],
    },
  })
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "ingredients",
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

        <div className="grid grid-cols-3 gap-6">
          {fields.map((ingredient, ingredientIndex) => (
            <IngredientListItem
              key={ingredient.id}
              amount={ingredient.amount}
              unit={ingredient.unit}
              ingredient={
                ingredients.find(
                  (ingr) => ingr.id === ingredient.ingredient_id
                ) || { id: ingredient.ingredient_id, name: "Inconnu" }
              }
              onRemove={() => remove(ingredientIndex)}
            />
          ))}
        </div>

        <IngredientForm
          data={ingredients}
          onSubmit={(values) => {
            if (
              form
                .getValues()
                .ingredients.find(
                  (ingr) => ingr.ingredient_id === values.ingredient_id
                )
            ) {
              return alert("Cet ingrédient est déjà dans la liste.")
            }
            append(values)
          }}
        />
        <FormField
          control={form.control}
          name="cuisine"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Cuisine</FormLabel>
              <CuisinesPopover
                selectedValue={field.value}
                onSelect={(id) => form.setValue("cuisine", id)}
              />
              <FormMessage />
            </FormItem>
          )}
        />
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

type IngredientFormData = FormData["ingredients"][0]

function IngredientForm({
  data,
  onSubmit,
}: {
  data: Ingredient[]
  onSubmit: (values: IngredientFormData) => void
}) {
  const form = useForm<IngredientFormData>({
    defaultValues: { amount: 1, ingredient_id: "", unit: "g" },
  })

  return (
    <Form {...form}>
      <div id="ingredient-form" className="space-x-2 flex flex-row">
        <FormField
          control={form.control}
          name="ingredient_id"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Ingrédient</FormLabel>
              <IngredientPopover
                data={data}
                selectedValue={field.value}
                onSelect={(id) => form.setValue("ingredient_id", id)}
              />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Quantité</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="unit"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Unité</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Unit" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="g">g</SelectItem>
                  <SelectItem value="p">pièce(s)</SelectItem>
                  <SelectItem value="l">l</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <Button
          className="mt-[22px]"
          onClick={form.handleSubmit((values) => {
            onSubmit(values)
            form.reset()
          })}
        >
          Ajouter l&apos;ingredient
        </Button>
      </div>
    </Form>
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
              : "Selectionner un ingrédient"}
            <Icons.chedown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Rechercher des ingrédients..." />
          <CommandEmpty>Aucun ingrédient trouvée.</CommandEmpty>
          <CommandGroup className="h-[400px] overflow-y-auto">
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
