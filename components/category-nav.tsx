"use client"

import React from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { cn, createUrl } from "@/lib/utils"

import { Icons } from "./icons"
import { Label } from "./ui/label"

export default function CategoryNav() {
  const searchParams = useSearchParams()

  return (
    <nav className=" grid gap-5 grid-flow-col auto-cols-max items-center pt-4">
      <CategoryItem id="veggie" />
      <CategoryItem id="poultry" />
      <CategoryItem id="beef" />
      <CategoryItem id="porc" />
      <CategoryItem id="seafood" />
      <CategoryItem id="fish" />
    </nav>
  )
}

type Props = {
  id: string
}

function CategoryItem({ id }: Props) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathName = usePathname()
  const Icon = Icons[id]

  function handleClick() {
    const newParams = new URLSearchParams(searchParams.toString())
    const cat = searchParams.get("cat")

    if (cat === id) {
      newParams.delete("cat")
    } else {
      newParams.set("cat", id)
    }
    router.push(createUrl(pathName, newParams))
  }

  return (
    <Label
      onClick={handleClick}
      className={cn(
        "flex flex-col items-center rounded-md justify-between p-4 cursor-pointer",
        searchParams?.get("cat") === id && "bg-muted text-orange-400"
      )}
    >
      <Icon className="mb-3 h-6 w-6" />
      {id}
    </Label>
  )
}
