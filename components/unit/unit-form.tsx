import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { unitSchema } from "@/lib/validations/unit"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

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

type FormData = z.infer<typeof unitSchema>

export function UnitForm({
  id,
  defaultValues,
  onSuccess,
}: {
  id?: number
  defaultValues?: FormData
  onSuccess?: (id: number) => void
}) {
  const [isSaving, setIsSaving] = React.useState<boolean>(false)

  const form = useForm<FormData>({
    resolver: zodResolver(unitSchema),
    defaultValues: defaultValues || {
      name: "",
      internal_name: "",
      short_name: "",
    },
  })

  async function onSubmit(values: FormData) {
    setIsSaving(true)

    const response = await fetch(`/api/units`, {
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

    onSuccess?.(body.id)
  }

  return (
    <Form {...form}>
      <form id="unit-form" className="space-y-8 max-w-3xl">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom complet</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="short_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom court</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="internal_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom interne</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ratio_to_mass"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ratio pour masse</FormLabel>
              <FormDescription>
                Masse (en g) équivalente à une unité
              </FormDescription>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ratio_to_volume"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ratio pour volume</FormLabel>
              <FormDescription>
                Volume (en mL) équivalent à une unité
              </FormDescription>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button onClick={form.handleSubmit(onSubmit)} disabled={isSaving}>
          Créer
        </Button>
      </form>
    </Form>
  )
}

export function UnitCreationDialog() {
  const router = useRouter()
  const [open, setOpen] = useState<boolean>(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Créer une unité</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Créer une unité</DialogTitle>
        </DialogHeader>
        <UnitForm
          onSuccess={() => {
            setOpen(false)
            router.refresh()
          }}
        />
      </DialogContent>
    </Dialog>
  )
}
