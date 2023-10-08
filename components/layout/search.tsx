"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { createUrl } from "@/lib/utils"

import { Icons } from "../icons"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

export default function Search({
  redirectToPathname,
}: {
  redirectToPathname?: string
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathName = usePathname()

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const val = e.target as HTMLFormElement
    const search = val.search as HTMLInputElement
    const newParams = new URLSearchParams(searchParams.toString())

    if (search.value) {
      newParams.set("q", search.value)
    } else {
      newParams.delete("q")
    }
    router.push(createUrl(redirectToPathname || pathName, newParams))
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-row gap-2 items-center">
      <Input
        className="flex-1"
        type="search"
        name="search"
        placeholder="Chercher des recettes"
        autoComplete="off"
        defaultValue={searchParams?.get("q") || ""}
      />
      <Button variant="secondary" size="icon">
        <Icons.search className="w-4 h-4" />
      </Button>
    </form>
  )
}
