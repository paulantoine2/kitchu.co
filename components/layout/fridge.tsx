import React from "react"
import { Label } from "@radix-ui/react-dropdown-menu"
import { Input } from "postcss"

import { Icons } from "../icons"
import { Button } from "../ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet"

export default function Fridge() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary" size="sm">
          <Icons.fridge className="mr-2 h-4 w-4" />
          Fridge
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Fridge</SheetTitle>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
