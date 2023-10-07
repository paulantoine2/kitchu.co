"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"

import { Unit } from "@/types/data"
import { ingredientSchema } from "@/lib/validations/ingredient"

import { GenerateImageField } from "../common/generate-image-field"
import { Icons } from "../icons"
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"
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
import { UnitCreationDialog } from "../unit/unit-form"

type FormData = z.infer<typeof ingredientSchema>

export function IngredientForm({
  id,
  defaultValues,
  units,
  pictureUrl,
}: {
  id: number
  defaultValues: FormData
  pictureUrl?: string | null
  units: Unit[]
}) {
  const router = useRouter()

  const form = useForm<FormData>({
    resolver: zodResolver(ingredientSchema),
    defaultValues: defaultValues || {
      name: "",
      units: [],
    },
  })

  const [isSaving, setIsSaving] = React.useState<boolean>(false)

  async function onSubmit(values: FormData) {
    setIsSaving(true)

    const response = await fetch(`/api/ingredients/${id}`, {
      method: "PATCH",
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

    router.refresh()
    router.push("/admin/ingredients")
  }

  const getPrompt = () => {
    return `Photo de "${
      form.getValues().name
    }" seul sur fond complètement blanc. Sans ombre apparente.`
  }

  console.log(form.getValues())

  return (
    <Form {...form}>
      <form
        id="ingredient-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl"
      >
        <div className="flex gap-4">
          <div className="w-[200px] aspect-square bg-slate-100 rounded-sm flex items-center justify-center overflow-hidden">
            {pictureUrl ? (
              <img src={pictureUrl} alt="current picture" />
            ) : (
              <p>Pas d&apos;image</p>
            )}
          </div>
          <FormField
            control={form.control}
            name="picture_data"
            render={({ field }) => (
              <div className="w-[200px] aspect-square bg-slate-100 rounded-sm flex items-center justify-center overflow-hidden">
                {field.value ? (
                  <img src={field.value} alt={field.name} />
                ) : (
                  <p>Pas d&apos;image</p>
                )}
              </div>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="units"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Unités</FormLabel>
                <FormDescription>
                  Sélectionner les unités dans lesquel cet ingrédient peut-être
                  mesuré dans une recette
                </FormDescription>
              </div>
              {units.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="units"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id
                                    )
                                  )
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {item.internal_name}
                        </FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <UnitCreationDialog />
        <GenerateImageField
          prompt={getPrompt}
          onSelect={(imageData) =>
            form.setValue("picture_data", `data:image/png;base64, ${imageData}`)
          }
        />
        <Button type="submit">
          {isSaving && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Sauvegarder
        </Button>
      </form>
    </Form>
  )
}
