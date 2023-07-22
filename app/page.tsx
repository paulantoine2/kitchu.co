import { supabase } from "@/lib/supabase"
import { Fridge } from "@/components/fridge"

export default async function HomePage() {
  return (
    <div className="container transition-all animate-fade-in ">
      <h1 className=" scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mt-[100px] text-center mb-4">
        Trouvez des idées recette en fonction <br />
        de ce qu&apos;il y a dans votre frigo !
      </h1>
      <p className="text-xl text-muted-foreground mb-[50px] text-center">
        Selectionnez les ingrédients que vous avez, on se charge du reste.
      </p>
    </div>
  )
}
