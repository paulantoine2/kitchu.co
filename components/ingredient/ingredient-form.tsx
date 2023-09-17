"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { ingredientSchema } from "@/lib/validations/ingredient"

import { GenerateImageField } from "../common/generate-image-field"
import { Icons } from "../icons"
import { Button } from "../ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"

type FormData = z.infer<typeof ingredientSchema>

export function IngredientForm({
  id,
  defaultValues,
}: {
  id: number
  defaultValues: FormData
}) {
  const router = useRouter()

  const form = useForm<FormData>({
    resolver: zodResolver(ingredientSchema),
    defaultValues: defaultValues || {
      name: "",
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

    router.push("/ingredients")
  }

  const getPrompt = () => {
    return `Photo de "${form.getValues().name}" sur fond blanc. Pas d'ombre.`
  }

  return (
    <Form {...form}>
      <form
        id="ingredient-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl"
      >
        <FormField
          control={form.control}
          name="picture_data"
          render={({ field }) => (
            <div className="w-[200px] aspect-square bg-slate-100 rounded-sm flex items-center justify-center">
              {field.value ? (
                <img src={field.value} alt={field.name} />
              ) : (
                <p>Pas d&apos;image</p>
              )}
            </div>
          )}
        />
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
