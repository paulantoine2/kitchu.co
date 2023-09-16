"use client"

import React, { useEffect, useRef, useState, useTransition } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

import { Icons } from "../icons"
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
import { useFridge } from "./fridge-provider"

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

export default function FridgeModal() {
  const [isOpen, setIsOpen] = useState(false)
  const {
    addItemToFridge,
    clearFridge,
    fridge,
    fridgeIsUpdating,
    removeItemFromFridge,
    startFridgeTransition,
    updateFridgeItem,
  } = useFridge()

  const quantityRef = useRef(fridge?.length || 0)
  const router = useRouter()
  const isPending = fridgeIsUpdating

  useEffect(() => {
    if (fridge && fridge.length !== quantityRef.current) {
      // But only if it's not already open (quantity also changes when editing items in cart).
      if (!isOpen) {
        setIsOpen(true)
      }

      // Always update the quantity reference
      quantityRef.current = fridge.length
    }
  }, [isOpen, fridge, quantityRef])

  function renderAddButton(className?: string) {
    return (
      <Button
        onClick={() => {
          router.push("/ingredients")
          setIsOpen(false)
        }}
        size="sm"
        className={className}
      >
        <Icons.add className="mr-2 h-4 w-4" />
        Ajouter des ingrédients
      </Button>
    )
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="secondary" size="sm">
          <Icons.fridge className="mr-2 h-4 w-4" />
          Fridge
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col px-0 gap-0">
        <SheetHeader className="px-4 pb-4 flex flew-row justify-between">
          <SheetTitle>Fridge</SheetTitle>
        </SheetHeader>
        <Separator />
        {fridge && fridge.length > 0 ? (
          <>
            <ScrollArea className="flex-1 px-4">
              <div className="mt-4"></div>
              {fridge.map((item) => (
                <React.Fragment key={item.ingredient?.id}>
                  <div className="group pl-3 pr-1 pt-4 pb-4 space-x-3 flex ">
                    <div className="flex-1">
                      <div className="text-sm font-medium truncate">
                        {item.ingredient?.name}
                      </div>
                      <div className="text-sm truncate text-muted-foreground capitalize">
                        {item.ingredient?.category}
                      </div>
                      <div className="flex space-x-2 mt-2">
                        <div className="border border-input rounded-sm flex">
                          {/* <Button
                            variant="ghost"
                            className="p-2  h-[30px]"
                            disabled={isPending || item.quantity === 1}
                            onClick={() => decrement(item)}
                          >
                            <Icons.minus className="w-4 h-4" />
                          </Button> */}
                          <Input
                            value={item.quantity}
                            className="w-[60px] text-center p-0 px-2 border-none z-10  h-[30px]"
                            disabled={isPending}
                            type="number"
                            onChange={(e) => {
                              if (item.ingredient)
                                updateFridgeItem(item.ingredient.id, {
                                  quantity: +e.target.value,
                                })
                            }}
                          />
                          {/* <Button
                            variant="ghost"
                            className="p-2 h-[30px]"
                            disabled={isPending}
                            onClick={() => increment(item)}
                          >
                            <Icons.plus className="w-4 h-4" />
                          </Button> */}
                        </div>

                        <Select value="pce">
                          <SelectTrigger className="w-[80px] h-8">
                            <SelectValue placeholder="Select a fruit" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="g">g</SelectItem>
                              <SelectItem value="pce">pièce</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <Button
                          variant="ghost"
                          className="p-2 h-[32px]"
                          onClick={() => {
                            if (item.ingredient)
                              removeItemFromFridge(item.ingredient.id)
                          }}
                        >
                          <Icons.trash className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    {item.ingredient && (
                      <div className="overflow-hidden rounded-full aspect-square relative w-16 h-16 ">
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
                  </div>
                  <Separator />
                </React.Fragment>
              ))}
            </ScrollArea>
            <Separator />
            <div className="p-4 space-y-2">
              {renderAddButton("w-full")}
              <Button variant="ghost" className="w-full" onClick={clearFridge}>
                Vider le fridge
              </Button>
            </div>
          </>
        ) : (
          <div className="h-full flex-col flex items-center justify-center px-8 space-y-2">
            <Icons.fridge className="text-muted-foreground" />
            <p className="text-lg font-semibold">Votre fridge est vide !</p>
            <p className="text-sm text-muted-foreground text-center">
              Ajoutez y les ingrédients que vous possédez chez vous pour nous
              aider a vous proposer des recettes les utilisant en priorité
            </p>

            {renderAddButton()}
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
