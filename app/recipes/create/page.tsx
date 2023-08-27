import Link from "next/link"

import { TypographyH1 } from "@/components/ui/typography"
import { Icons } from "@/components/icons"

export default async function CreateRecipePage() {
  return (
    <div>
      <div className="my-12">
        <TypographyH1>Créer une recette</TypographyH1>
      </div>
      <div className="grid grid-cols-2 gap-5">
        <Link
          href="create/new"
          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
        >
          <Icons.create className="mb-3 h-6 w-6" />
          Créer une nouvelle recette
        </Link>
        <Link
          href="create/import"
          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
        >
          <Icons.import className="mb-3 h-6 w-6" />
          Importer depuis un autre site
        </Link>
      </div>
    </div>
  )
}
