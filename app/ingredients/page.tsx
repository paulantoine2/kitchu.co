import Image from "next/image"

import { getAllIngredients } from "@/lib/supabase"
import { Alert } from "@/components/ui/alert"

export const revalidate = 60

export default async function IngredientsPage() {
  const {
    count,
    data: items,
    error,
    status,
    statusText,
  } = await getAllIngredients()

  if (error) return <Alert>{error.message}</Alert>

  return (
    <div className="container">
      {items.length > 0 ? (
        <div className="grid grid-cols-5 gap-6 my-4">
          {items.map((i) => (
            <div
              className="space-x-3 transition-all animate-fade-in flex items-center"
              key={i.id}
            >
              <div className="overflow-hidden rounded-full aspect-square relative w-16 h-16 p-2 bg-slate-700">
                <Image
                  src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/ingredient/${i.id}.png`}
                  alt={i.name}
                  width={100}
                  height={100}
                  className="object-cover bg-slate-700"
                  placeholder="empty"
                />
              </div>
              <h3 className="text-sm font-medium truncate">{i.name}</h3>
            </div>
          ))}
        </div>
      ) : (
        <h1>No results</h1>
      )}
    </div>
  )
}
