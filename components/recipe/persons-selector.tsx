"use client"

import React from "react"

import { usePersons } from "@/app/(site)/recipes/[id]/persons-provider"

import { Icons } from "../icons"
import { Button } from "../ui/button"

export default function PersonsSelector() {
  const { setPersons, persons } = usePersons()

  return (
    <div className="flex items-center w-full">
      <Button
        variant="outline"
        size="icon"
        onClick={() => setPersons((prev) => prev - 1)}
        disabled={persons === 1}
      >
        <Icons.minus className="h-4 w-4" />
      </Button>
      <div className="flex-1 text-center">{persons} personnes</div>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setPersons((prev) => prev + 1)}
      >
        <Icons.plus className="h-4 w-4" />
      </Button>
    </div>
  )
}
