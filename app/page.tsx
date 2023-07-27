import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Logo } from "@/components/common/logo"
import SignUpAlert from "@/components/common/sign-up-alert"

export const metadata: Metadata = {
  description: `La liste de course intelligente qui vous fait faire des économies de temps et d'argent, réduit le gaspillage alimentaire et vous fait manger mieux.`,
  keywords:
    "courses,recettes,cuisine,régime,drive,liste,gaspi,frigo,gaspillage,ingrédients",
}

export default async function HomePage() {
  return (
    <div>
      <div className="transition-all animate-fade-in">
        <div className="h-screen justify-center flex flex-col items-center relative">
          <div className="justify-center flex flex-col items-center relative">
            <Image
              src="/recip2.png"
              width={400}
              height={400}
              alt="Recipe 1"
              className="absolute -left-[400px] -top-[170px]"
            ></Image>
            <Image
              src="/recip3.png"
              width={700}
              height={700}
              alt="Recipe 3"
              className="absolute -right-[620px] -top-[50px]"
            ></Image>
            <Image
              src="/recip1.png?"
              width={500}
              height={500}
              alt="Recipe 3"
              className="absolute top-[200px] -left-[300px]"
            ></Image>

            <Logo height="50" />
            <h1 className="hidden">Kitchu</h1>
            <h2 className=" scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl  text-center mb-4 mt-8">
              La liste de courses intelligente <br /> pour préparer vos
              meilleures recettes
            </h2>
            <p className="text-xl text-muted-foreground mb-[50px] text-center">
              Trouvez des idées de recettes, <br />
              réutilisez vos ingrédients restants, et estimez le cout de vos
              repas
            </p>
            <SignUpAlert />
          </div>
        </div>
      </div>
    </div>
  )
}
