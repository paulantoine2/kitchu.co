import Image from "next/image"

import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Fridge } from "@/components/fridge-old"
import { RecipesList } from "@/components/recipes-list"

export default async function HomePage() {
  return (
    <div>
      <div className="container transition-all animate-fade-in">
        <Image
          src="/recip2.png"
          width={400}
          height={400}
          alt="Recipe 1"
          className="absolute -left-[200px] -top-[70px]"
        ></Image>
        <Image
          src="/recip3.png"
          width={800}
          height={800}
          alt="Recipe 3"
          className="absolute -right-[450px] top-[50px]"
        ></Image>
        <Image
          src="/recip1.png?"
          width={500}
          height={500}
          alt="Recipe 3"
          className="absolute top-[300px] -left-[100px]"
        ></Image>
        <div className="h-[800px] pt-[200px] flex flex-col items-center">
          <h1 className=" scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl  text-center mb-4">
            La liste de courses intelligente <br /> pour préparer vos meilleures
            recettes
          </h1>
          <p className="text-xl text-muted-foreground mb-[50px] text-center">
            Gagnez du temps, trouvez des idées de recettes, <br />
            réutilisez vos ingrédients restants, et estimez le cout de vos repas
          </p>
          <Button size="lg">Voir les recettes</Button>
          <Button size="lg" variant="secondary" className="mt-2">
            Ajouter des ingredients
          </Button>
        </div>
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          Recettes du moment
        </h2>
        <div className="grid grid-cols-5 gap-6 my-4 mb-20">
          <RecipesList searchValue="" limit={5} />
        </div>

        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          Les mieux notées
        </h2>
        <div className="grid grid-cols-5 gap-6 my-4">
          <RecipesList searchValue="poulet" limit={5} />
        </div>
      </div>
    </div>
  )
}
