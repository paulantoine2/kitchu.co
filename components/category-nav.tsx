import React from "react"

import { Icons } from "./icons"
import { Label } from "./ui/label"

export default function CategoryNav() {
  return (
    <nav className="container grid gap-5 grid-flow-col auto-cols-max items-center py-1">
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
    </nav>
  )
}
