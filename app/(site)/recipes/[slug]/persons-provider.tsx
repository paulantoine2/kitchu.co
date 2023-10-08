"use client"

import React from "react"

type PersonsContext = {
  persons: number
  setPersons: React.Dispatch<React.SetStateAction<number>>
}

const Context = React.createContext<PersonsContext | undefined>(undefined)

export default function PersonsProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [persons, setPersons] = React.useState(2)

  return (
    <Context.Provider value={{ persons, setPersons }}>
      {children}
    </Context.Provider>
  )
}

export const usePersons = () => {
  const context = React.useContext(Context)

  if (context === undefined) {
    throw new Error("usePersons must be used inside PersonsProvider")
  }

  return context
}

export function IngredientQuantity({
  quantity,
  unit,
}: {
  quantity: number
  unit: string
}) {
  const { persons } = usePersons()

  return (
    <p className="text-sm text-muted-foreground">{`${
      quantity * persons
    } ${unit}`}</p>
  )
}
