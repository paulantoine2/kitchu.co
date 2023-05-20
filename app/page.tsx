import Image from "next/image"

import { supabase } from "@/lib/supabase"
import { Alert } from "@/components/ui/alert"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"

export const revalidate = 60

export default async function RecipesPage() {
  const { count, data, error, status, statusText } = await supabase
    .from("recipe")
    .select()

  if (error) return <Alert>{error.message}</Alert>

  return (
    <div>
      <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full border-b bg-background/95 shadow-sm backdrop-blur">
        <div className="container grid gap-5 grid-flow-col auto-cols-max items-center py-1">
          <Label className="flex flex-col items-center rounded-md justify-between bg-popover p-4 hover:bg-accent hover:text-accent-foreground">
            <Icons.veggie className="mb-3 h-6 w-6" />
            Veggie
          </Label>
          <Label className="flex flex-col items-center rounded-md justify-between bg-popover p-4 hover:bg-accent hover:text-accent-foreground">
            <Icons.poultry className="mb-3 h-6 w-6" />
            Poultry
          </Label>
          <Label className="flex flex-col items-center rounded-md justify-between bg-popover p-4 hover:bg-accent hover:text-accent-foreground">
            <Icons.beef className="mb-3 h-6 w-6" />
            Beef
          </Label>
          <Label className="flex flex-col items-center rounded-md justify-between bg-popover p-4 hover:bg-accent hover:text-accent-foreground">
            <Icons.porc className="mb-3 h-6 w-6" />
            Porc
          </Label>
          <Label className="flex flex-col items-center rounded-md justify-between bg-popover p-4 hover:bg-accent hover:text-accent-foreground">
            <Icons.seafood className="mb-3 h-6 w-6" />
            Seafood
          </Label>
          <Label className="flex flex-col items-center rounded-md justify-between bg-popover p-4 hover:bg-accent hover:text-accent-foreground">
            <Icons.fish className="mb-3 h-6 w-6" />
            Fish
          </Label>
        </div>
      </header>
      <div className="container grid grid-cols-5 gap-6 my-4">
        {data.map((r) => (
          <div className="space-y-3" key={r.id}>
            <div className="overflow-hidden rounded-md">
              <Image
                src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/recipe/${r.id}.png`}
                alt={r.name}
                width={1000}
                height={1000}
                className="h-auto w-auto object-cover  aspect-square"
              />
            </div>
            <div className="space-y-1 text-sm">
              <h3 className="font-medium leading-none">{r.name}</h3>
              <p className="text-xs text-muted-foreground">{r.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
