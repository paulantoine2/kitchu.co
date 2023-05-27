import Image from "next/image"

type Props = {
  ingredient: {
    id: string
    name: string
  }
  amount?: number | null
  unit?: string
}

export default function Ingredient({ ingredient, amount, unit }: Props) {
  return (
    <div className="space-x-3 transition-all animate-fade-in flex items-center">
      <div className="overflow-hidden rounded-full aspect-square relative w-16 h-16 p-2 ">
        <Image
          src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/ingredient/${ingredient.id}.png`}
          alt={ingredient.name}
          width={100}
          height={100}
          className="object-cover"
          placeholder="empty"
        />
      </div>
      <div>
        <h3 className="text-sm font-medium truncate">{ingredient.name}</h3>
        {(amount || unit) && (
          <p className="text-sm text-muted-foreground">{`${amount} ${unit}`}</p>
        )}
      </div>
    </div>
  )
}
