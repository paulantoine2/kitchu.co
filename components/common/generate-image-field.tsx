import React from "react"

import { cn } from "@/lib/utils"

import { Button } from "../ui/button"
import { Skeleton } from "../ui/skeleton"

export function GenerateImageField({
  prompt,
  onSelect,
}: {
  prompt: string | (() => string)
  onSelect: (imageData: string) => void
}) {
  const [generating, startTransition] = React.useTransition()
  const [images, setImages] = React.useState<
    { filename: string; data: string }[]
  >([])

  const [selected, setSelected] = React.useState<string>()
  const handleClick = () => {
    setImages([])
    startTransition(async () => {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        body: JSON.stringify({
          prompt: typeof prompt === "function" ? prompt() : prompt,
        }),
      })

      if (!response.ok) {
        return console.log(response.statusText)
      }

      const result = await response.json()

      setImages(result)
    })
  }

  return (
    <div>
      {!images.length && (
        <div className="grid grid-cols-4 gap-4 mb-2">
          {generating ? (
            <>
              <Skeleton className="max-w-full aspect-square" />
              <Skeleton className="max-w-full aspect-square" />
              <Skeleton className="max-w-full aspect-square" />
              <Skeleton className="max-w-full aspect-square" />
            </>
          ) : (
            <>
              <div className=" bg-slate-100 max-w-full rounded-sm aspect-square"></div>
              <div className="bg-slate-100 max-w-full rounded-sm aspect-square"></div>
              <div className="bg-slate-100 max-w-full rounded-sm aspect-square"></div>
              <div className="bg-slate-100 max-w-full rounded-sm aspect-square"></div>
            </>
          )}
        </div>
      )}
      {images.length > 0 && (
        <div className="grid grid-cols-4 gap-4 mb-2">
          {images.map((image) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              className={cn(
                "rounded-sm cursor-pointer",
                selected === image.filename && "ring-2 ring-ring ring-offset-2"
              )}
              alt={image.filename}
              key={image.filename}
              src={`data:image/png;base64, ${image.data}`}
              onClick={() => {
                setSelected(image.filename)
                onSelect(image.data)
              }}
            />
          ))}
        </div>
      )}
      <Button
        size="sm"
        variant="secondary"
        disabled={generating}
        onClick={handleClick}
      >
        {generating ? "Generation..." : "Générer des images"}
      </Button>
    </div>
  )
}
