"use client"

import { useRouter, useSearchParams } from "next/navigation"

import { createUrl } from "@/lib/utils"

import { Icons } from "../icons"
import { Input } from "../ui/input"

export default function Search() {
  const router = useRouter()
  const searchParams = useSearchParams()

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
    router.push(createUrl("/search", newParams))
  }

  return (
    <form onSubmit={onSubmit}>
      <Input
        type="search"
        name="search"
        placeholder="Search for recipes..."
        autoComplete="off"
        defaultValue={searchParams?.get("q") || ""}
      />
    </form>
  )
}
