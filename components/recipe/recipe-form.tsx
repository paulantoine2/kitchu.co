"use client"

import React, { useTransition } from "react"
import { useRouter } from "next/navigation"
// import { DevTool } from "@hookform/devtools"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Control,
  UseFormGetValues,
  useFieldArray,
  useForm,
} from "react-hook-form"
import * as z from "zod"

import { Ingredient, Unit } from "@/types/data"
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
import { IngredientImage } from "./ingredient-image"

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
      ingredients: [],
      name: "",
      difficulty: 0,
      prep_duration_min: 25,
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

  const [isSaving, setIsSaving] = React.useState<boolean>(false)

  const [ingredients, setIngredients] = React.useState<Ingredient[]>([])

  React.useEffect(() => {
    supabase
      .from("ingredient")
      .select("*")
      .then((res) => {
        if (res.data) setIngredients(res.data)
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

    console.log(response)

    if (!response?.ok) {
      setIsSaving(false)
      return alert("error")
    }

    const body = await response.json()

    router.push(`/recipes/${body.id}`)
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

        <div>
          <FormLabel>Ingrédients</FormLabel>
          <FormDescription>
            Sélectionnez les ingrédients nécessaires à la préparation de cette
            recette et leur quantité par personne
          </FormDescription>
          <div className="my-2 space-y-2">
            {ingredientsFieldArray.fields.map((field, index) => {
              return (
                <FormField
                  key={field.id}
                  control={form.control}
                  name={`ingredients.${index}`}
                  render={({ field: rootField }) => (
                    <IngredientField
                      id={rootField.value.ingredient_id}
                      name={
                        ingredients.find(
                          (ingr) => ingr.id === rootField.value.ingredient_id
                        )?.name || "unknown"
                      }
                      control={form.control}
                      index={index}
                      onRemove={() => ingredientsFieldArray.remove(index)}
                    />
                  )}
                />
              )
            })}
          </div>
          <IngredientPopover
            data={ingredients}
            onSelect={(id) => {
              ingredientsFieldArray.append(
                {
                  ingredient_id: id,
                  quantity: 0,
                  unit: 3,
                },
                {
                  shouldFocus: false,
                }
              )
            }}
          />
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
        <ImageButton getValues={form.getValues} />
        <Button type="submit">
          {isSaving && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Créer
        </Button>
      </form>
    </Form>
  )
}

function ImageButton({ getValues }: { getValues: UseFormGetValues<FormData> }) {
  const [generating, startTransition] = React.useTransition()
  const [images, setImages] = React.useState<
    { filename: string; data: string }[]
  >([])
  const handleClick = () => {
    startTransition(async () => {
      const formData = getValues()
      const response = await fetch("/api/generate-image", {
        method: "POST",
        body: JSON.stringify({
          prompt: `Photo vue du dessus d'un plat bien présenté dans une assiette. Le nom du plat est "${
            formData.name
          }". Les instructions pour préparer le sont "${formData.steps
            .map((step) => step.instructionsMarkdown)
            .join(", ")}"`,
        }),
      })

      const result = await response.json()

      setImages(result)
    })
  }

  return (
    <div>
      <Button disabled={generating} onClick={handleClick}>
        {generating ? "Generation..." : "Générer une image"}
      </Button>
      <div className="grid grid-cols-4 gap-4">
        {images.map((image) => (
          <img
            className="rounded-sm"
            alt={image.filename}
            key={image.filename}
            src={`data:image/png;base64, ${image.data}`}
          />
        ))}
      </div>
    </div>
  )
}

function IngredientPopover({
  data,
  onSelect,
}: {
  data: Ingredient[]
  onSelect: (value: number) => void
}) {
  const items = data
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button variant="secondary" size="sm">
            <Icons.add className="h-4 w-4 mr-2" />
            Ajouter un ingrédient
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
                {item.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

function IngredientField({
  name,
  id,
  index,
  onRemove,
  control,
}: {
  name: string
  id: number
  index: number
  onRemove: () => void
  control?: Control<FormData> | undefined
}) {
  const { supabase } = useSupabase()
  const [units, setUnits] = React.useState<Unit[]>([])

  React.useEffect(() => {
    supabase
      .from("ingredient_unit")
      .select("unit(*)")
      .eq("ingredient_id", id)
      .then((res) => {
        if (res.data)
          setUnits(
            res.data.map((iu) => iu.unit).filter((u) => u !== null) as Unit[]
          )
      })
  }, [id, supabase])

  return (
    <FormItem className="flex-1">
      <div className="flex flex-row">
        <div className="mr-2 flex items-center h-10 w-[350px] rounded-md border border-input px-1 text-sm ring-offset-background">
          <div className="overflow-hidden aspect-square w-10 h-10 p-1">
            <IngredientImage
              ingredient={{
                id,
                name,
              }}
              width={100}
              height={100}
              className="object-cover rounded-full"
            />
          </div>
          {name}
        </div>
        <FormField
          control={control}
          name={`ingredients.${index}.quantity`}
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  autoFocus
                  placeholder="Quantité"
                  type="number"
                  className="rounded-r-none border-r-0 z-10"
                  {...field}
                  onChange={(e) => field.onChange(+e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={`ingredients.${index}.unit`}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Select
                disabled={!id}
                onValueChange={(v) => field.onChange(+v)}
                value={field.value + ""}
              >
                <FormControl>
                  <SelectTrigger className="w-[150px] rounded-none z-10">
                    <SelectValue placeholder="Unité" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {units.map((unit) => (
                    <SelectItem key={unit.id} value={unit.id + ""}>
                      {unit.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex h-10 rounded-md border border-input bg-secondary px-3 py-2 text-sm ring-offset-background rounded-l-none border-l-0">
          / personne
        </div>
        <Button variant="ghost" size="icon" type="button" onClick={onRemove}>
          <Icons.close className="h-4 w-4" />
        </Button>
      </div>
    </FormItem>
  )
}

// function TagsPopover({
//   selectedValue,
//   onSelect,
// }: {
//   selectedValue: string | undefined
//   onSelect: (value: string | undefined) => void
// }) {
//   const [loading, setLoading] = React.useState(false)
//   const [items, setItems] = React.useState<Cuisine[]>([])
//   const { supabase } = useSupabase()

//   React.useEffect(() => {
//     async function getItems() {
//       setLoading(true)
//       const res = await supabase.from("cuisine").select("*")
//       if (res.data) setItems(res.data)
//       setLoading(false)
//     }

//     getItems()
//   }, [])

//   return (
//     <Popover>
//       <PopoverTrigger asChild>
//         <FormControl>
//           <Button
//             variant="outline"
//             role="combobox"
//             className={cn(
//               "w-[300px] justify-between",
//               !selectedValue && "text-muted-foreground"
//             )}
//           >
//             {selectedValue
//               ? items.find((item) => item.id === selectedValue)?.name
//               : "Selectionner une cuisine"}
//             <Icons.chedown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//           </Button>
//         </FormControl>
//       </PopoverTrigger>
//       <PopoverContent className="w-[300px] p-0">
//         <Command>
//           <CommandInput placeholder="Rechercher des cuisines..." />
//           <CommandEmpty>Aucune cuisine trouvée.</CommandEmpty>
//           <CommandGroup>
//             <CommandItem
//               onSelect={() => {
//                 onSelect(undefined)
//               }}
//             >
//               <Icons.check
//                 className={cn(
//                   "mr-2 h-4 w-4",
//                   undefined === selectedValue ? "opacity-100" : "opacity-0"
//                 )}
//               />
//               Aucune
//             </CommandItem>
//             {items.map((item) => (
//               <CommandItem
//                 value={item.name}
//                 key={item.id}
//                 onSelect={() => {
//                   onSelect(item.id)
//                 }}
//               >
//                 <Icons.check
//                   className={cn(
//                     "mr-2 h-4 w-4",
//                     item.id === selectedValue ? "opacity-100" : "opacity-0"
//                   )}
//                 />
//                 {item.name}
//               </CommandItem>
//             ))}
//           </CommandGroup>
//         </Command>
//       </PopoverContent>
//     </Popover>
//   )
// }
