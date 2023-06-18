"use client"

import { useState } from "react"

import { getMarketSalespoints } from "@/lib/supabase"
import { cn } from "@/lib/utils"
import { useSupabaseQuery } from "@/hooks/useSupabaseQuery"

import { Icons, MarketChainIcons } from "../icons"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Input } from "../ui/input"
import { Skeleton } from "../ui/skeleton"
import { useSession } from "./session-context"

function renderIcon(id: number) {
  const Icon = MarketChainIcons[id]

  return Icon ? <Icon className="mr-2 h-6 w-6" /> : null
}

export function StoreSelectorDialog() {
  const { session } = useSession()
  const [open, setIsOpen] = useState<boolean>(false)
  return (
    <>
      <Dialog open={open} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            {session?.market_salepoint ? (
              <>
                {renderIcon(session.market_salepoint.chain)}{" "}
                {session.market_salepoint.name}
              </>
            ) : (
              <>Choisir un magasin</>
            )}
            <Icons.chedown className="ml-2 h-4 w-4" />
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Point de vente de référence</DialogTitle>
            <DialogDescription>
              Selectionnez le point de vente qui servira au calcul des tarifs de
              vos plats
            </DialogDescription>
          </DialogHeader>
          <StoreSelector onDone={() => setIsOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  )
}

type StoreSelector = {
  onDone: () => void
}

function StoreSelector({ onDone }: StoreSelector) {
  const { session, updateSession } = useSession()
  const [selected, setSelected] = useState<number>()
  console.log("render")
  const { data, isError, isLoading } = useSupabaseQuery(getMarketSalespoints)

  console.log(data)

  return (
    <div className="grid grid-cols-2 gap-4 h-[300px]">
      {isLoading ? (
        <>
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
        </>
      ) : (
        <>
          <div>
            {data?.map((chain) => (
              <Button
                className={cn(
                  "space-x-4 w-full",
                  selected === chain.id && "bg-muted"
                )}
                variant="outline"
                key={chain.id}
                onClick={() => setSelected(chain.id)}
              >
                {renderIcon(chain.id)}
                <p className="text-sm font-medium leading-none flex-1">
                  {chain.name}
                </p>
                <Icons.right />
              </Button>
            ))}
          </div>
          <div className="space-y-4">
            {data
              ?.find((chain) => chain.id === selected)
              ?.market_salepoint.map((salepoint) => (
                <Button
                  onClick={() => {
                    updateSession({ market_salepoint: salepoint })
                    onDone()
                  }}
                  variant="outline"
                  className="w-full"
                  key={salepoint.id}
                >
                  {salepoint.name}
                </Button>
              ))}
          </div>
        </>
      )}
    </div>
  )
}
