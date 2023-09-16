"use client"

import React, { useEffect, useRef, useState, useTransition } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

import { Icons } from "../icons"
import { RecipeImage } from "../recipe/recipe-image"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { ScrollArea } from "../ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Separator } from "../ui/separator"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet"
import { useCart } from "./cart-provider"

type FridgeItem = {
  quantity: number
  unit: string
  ingredient: {
    category: string
    id: string
    name: string
  } | null
}

type Props = {
  items: FridgeItem[]
  user_id: string
}

export default function CartModal() {
  const [isOpen, setIsOpen] = useState(false)
  const {
    addItemToCart,
    cart,
    cartIsUpdating,
    clearCart,
    removeItemFromCart,
    startCartTransition,
    updateCartItem,
  } = useCart()
  const quantityRef = useRef(cart?.length || 0)
  const router = useRouter()
  const isPending = cartIsUpdating

  useEffect(() => {
    if (cart && cart.length !== quantityRef.current) {
      // But only if it's not already open (quantity also changes when editing items in cart).
      if (!isOpen) {
        setIsOpen(true)
      }

      // Always update the quantity reference
      quantityRef.current = cart.length
    }
  }, [isOpen, cart, quantityRef])

  function renderAddButton(className?: string) {
    return (
      <Button
        onClick={() => {
          router.push("/recipes")
          setIsOpen(false)
        }}
        size="sm"
        className={className}
      >
        <Icons.add className="mr-2 h-4 w-4" />
        Ajouter des recettes
      </Button>
    )
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="secondary" size="sm">
          <Icons.cart className="mr-2 h-4 w-4" />
          Panier
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col px-0 gap-0">
        <SheetHeader className="px-4 pb-4 flex flew-row justify-between">
          <SheetTitle>Panier</SheetTitle>
        </SheetHeader>
        <Separator />
        {cart && cart.length > 0 ? (
          <>
            <ScrollArea className="flex-1 px-4">
              <div className="mt-4">
                {cart.map((item) => (
                  <React.Fragment key={item.recipe?.id}>
                    <div className="group pl-3 pr-1 pt-4 pb-4 space-x-3 flex ">
                      <div className="flex-1">
                        <div className="text-sm font-medium truncate">
                          {item.recipe?.name}
                        </div>

                        <div className="flex space-x-2 mt-2">
                          <div className="border border-input rounded-sm flex">
                            <Input
                              value={item.quantity}
                              className="w-[60px] text-center p-0 px-2 border-none z-10  h-[30px]"
                              disabled={isPending}
                              type="number"
                              onChange={(e) => {}}
                            />
                          </div>
                          <Button
                            variant="ghost"
                            className="p-2 h-[32px]"
                            onClick={() => {}}
                          >
                            <Icons.trash className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      {item.recipe && (
                        <div className="overflow-hidden rounded-sm aspect-square relative w-16 h-16 ">
                          <RecipeImage
                            recipe={item.recipe}
                            fill
                            className="object-cover bg-muted"
                            quality={25}
                          />
                        </div>
                      )}
                    </div>
                    <Separator />
                  </React.Fragment>
                ))}
              </div>
            </ScrollArea>
            <Separator />
            <div className="p-4 space-y-2">
              {renderAddButton("w-full")}
              <Button variant="ghost" className="w-full" onClick={clearCart}>
                Vider le panier
              </Button>
            </div>
          </>
        ) : (
          <div className="h-full flex-col flex items-center justify-center px-8 space-y-2">
            <Icons.cart className="text-muted-foreground" />
            <p className="text-lg font-semibold">Votre panier est vide !</p>
            <p className="text-sm text-muted-foreground text-center">
              Ajoutez y vos recettes, une liste de courses sera automatiquement
              générée en fonction des ingrédients que vous avez !
            </p>

            {renderAddButton()}
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
