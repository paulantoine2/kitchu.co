"use client"

import React, { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Icons } from "../icons"
import { Button } from "../ui/button"
import { Card } from "../ui/card"
import { ScrollArea } from "../ui/scroll-area"
import { Separator } from "../ui/separator"
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

type Props = {
  items: {
    quantity: number
    unit: string
    ingredient: {
      category: string
      id: string
      name: string
    } | null
  }[]
}

export default function FridgeModal({ items }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const quantityRef = useRef(items.length)
  const router = useRouter()

  useEffect(() => {
    if (items.length !== quantityRef.current) {
      // But only if it's not already open (quantity also changes when editing items in cart).
      if (!isOpen) {
        setIsOpen(true)
      }

      // Always update the quantity reference
      quantityRef.current = items.length
    }
  }, [isOpen, items.length, quantityRef])

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="secondary" size="sm">
          <Icons.fridge className="mr-2 h-4 w-4" />
          Fridge
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col px-0 gap-0">
        <SheetHeader className="px-4 pb-4">
          <SheetTitle>Fridge</SheetTitle>
        </SheetHeader>
        <Separator />
        {items.length > 0 ? (
          <ScrollArea className="flex-1 px-4">
            <div className="mt-4"></div>
            {items.map((item) => (
              <Card
                key={item.ingredient?.id}
                className="mb-2 pl-1 pr-4 space-x-3 transition-all animate-fade-in flex items-center"
              >
                {item.ingredient && (
                  <div className="overflow-hidden rounded-full aspect-square relative w-16 h-16 p-2 ">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/ingredient/${item.ingredient.id}.png`}
                      alt={item.ingredient.name}
                      width={100}
                      height={100}
                      className="object-cover"
                      placeholder="empty"
                    />
                  </div>
                )}
                <div className="overflow-hidden flex-1">
                  <h3 className="text-sm font-medium truncate">
                    {item.ingredient?.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{`${item.quantity} ${item.unit}`}</p>
                </div>
              </Card>
            ))}
          </ScrollArea>
        ) : (
          <div className="h-full flex-col flex items-center justify-center px-8 space-y-2">
            <Icons.fridge className="text-muted-foreground" />
            <p className="text-lg font-semibold">Votre fridge est vide !</p>
            <p className="text-sm text-muted-foreground text-center">
              Ajoutez y les ingrédients que vous possédez chez vous pour nous
              aider a vous proposer des recettes les utilisant en priorité
            </p>

            <Button
              onClick={() => {
                router.push("/ingredients")
                setIsOpen(false)
              }}
              size="sm"
            >
              <Icons.add className="mr-2 h-4 w-4" />
              Ajouter des ingrédients
            </Button>
          </div>
        )}
        {/* <Separator />
        <SheetFooter className="p-4">
          <Button size="sm">
            <Icons.check className="mr-2 h-4 w-4" />
            Sauvegarder les modifications
          </Button>
        </SheetFooter> */}
      </SheetContent>
    </Sheet>
  )
}
