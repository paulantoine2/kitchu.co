import { supabase } from "@/lib/supabase"
import { Fridge } from "@/components/fridge"

export default async function HomePage() {
  const {
    count,
    data: items,
    error,
    status,
    statusText,
  } = await supabase
    .from("ingredient")
    .select("*")
    .order("name", { ascending: true })

  if (!items) return <></>

  return (
    <div className="container transition-all animate-fade-in ">
      <h1 className=" scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mt-[100px] text-center mb-4">
        Trouvez des idées recette en fonction <br />
        de ce qu&apos;il y a dans votre frigo !
      </h1>
      <p className="text-xl text-muted-foreground mb-[50px] text-center">
        Selectionnez les ingrédients que vous avez, on se charge du reste.
      </p>
      <div className="flex flex-col items-center my-6">
        <Fridge ingredients={items} />
      </div>
    </div>
  )
}
