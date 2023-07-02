import React from "react"

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

export default function Cart() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary" size="sm">
          <Icons.cart className="mr-2 h-4 w-4" />
          Panier
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Panier</SheetTitle>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
