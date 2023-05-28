"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Input } from "../ui/input"

export function ImportDialog() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    setLoading(true)
    setError("")
    e.preventDefault()

    const val = e.target as HTMLFormElement
    const url = val.url as HTMLInputElement

    const response = await fetch("api/import", {
      method: "POST",
      body: JSON.stringify({ url: url.value }),
    })

    setLoading(false)

    if (!response.ok) {
      if (response.status === 400) setError("Invalid URL.")
      if (response.status === 500)
        setError("Something went wrong. Try again later.")
    }

    const body = await response.json()

    router.push(`/recipes/${body.uuid}`)
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Import</Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Import recipe</DialogTitle>
            <DialogDescription>
              Copy / Paste a HelloFresh recipe link and click import.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={onSubmit}>
            <Input
              name="url"
              placeholder="https://www.hellofresh.fr/recipes/mafe-revisite-au-poulet-and-carotte-64073d979c6d10cd16eab751"
              autoComplete="off"
              className="mb-6"
            />
            {error && (
              <p className="text-sm font-medium leading-none text-destructive">
                {error}
              </p>
            )}
            <DialogFooter>
              {loading ? (
                <Button disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Importing...
                </Button>
              ) : (
                <Button type="submit">Import</Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
