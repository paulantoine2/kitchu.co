import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyLarge,
  TypographyLead,
  TypographyMuted,
  TypographyP,
  TypographySmall,
} from "@/components/ui/typography"
import { Logo } from "@/components/common/logo"
import SignUpAlert from "@/components/common/sign-up-alert"
import { Icons } from "@/components/icons"
import { UserAuthForm } from "@/components/user-auth-form"

export const metadata: Metadata = {
  description: `La liste de course intelligente qui vous fait faire des économies de temps et d'argent, réduit le gaspillage alimentaire et vous fait manger mieux.`,
  keywords:
    "courses,recettes,cuisine,régime,drive,liste,gaspi,frigo,gaspillage,ingrédients",
}

export default async function HomePage() {
  return (
    <div>
      <div className="transition-all animate-fade-in container">
        <SignUpAlert />
        <div className="flex flex-col justify-center items-start h-[700px] gap-5">
          <Logo height="30" />
          <h1 className="hidden">Kitchu</h1>
          <TypographyH1>
            La liste de courses intelligente <br /> pour préparer vos
            <br />
            meilleures recettes
          </TypographyH1>
          <TypographyLead>
            Trouvez des idées de recettes, évitez le gaspillage,
            <br /> estimez le cout de vos repas
          </TypographyLead>
          <Button asChild aria-label="signup">
            <Link href="#signup">Pré-inscription</Link>
          </Button>
        </div>
        <div className="flex gap-10 relative">
          <RecipeCard
            name="Mafé revisité au poulet & carotte"
            headline="avec des cacahuètes & du riz"
            price={3.45}
            imgSrc="/recipe1.jpeg"
            animationDelay={200}
          />
          <RecipeCard
            name="Quesadillas veggie & guacamole maison"
            headline="avec du cheddar & du citron vert"
            price={2.21}
            imgSrc="/recipe2.jpeg"
            animationDelay={300}
          />
          <RecipeCard
            name="Porc & sauce fraise-balsamique façon brasserie"
            headline="avec des pommes de terre rôties & du poireau"
            price={4.06}
            imgSrc="/recipe3.jpeg"
            animationDelay={400}
          />
          <List />
          <Image
            className="opacity-0 absolute right-0 bottom-[475px] transition-all animate-fade-in"
            style={{ animationDelay: `600ms` }}
            alt="bag"
            src="/bag.png"
            width={350}
            height={350}
          />
        </div>
        <div className="relative flex justify-around my-[150px] grayscale">
          <Image height={30} width={181} src="/carrefour.png" alt="Carrefour" />
          <Image height={30} width={121} src="/leclerc.png" alt="Carrefour" />
          <Image height={30} width={100} src="/auchan.png" alt="Carrefour" />
          <Image
            height={30}
            width={154}
            src="/intermarche.png"
            alt="Carrefour"
          />
          <Image height={30} width={124} src="/superu.png" alt="Carrefour" />
        </div>
        <div className="flex flex-col items-center text-center">
          <TypographyH1 className="lg:text-4xl mb-3">
            Qu&apos;est ce que Kitchu ?
          </TypographyH1>
          <TypographyLead>
            L&apos;app qui vous fait gagner du temps et de l&apos;argent en
            planifiant vos
            <br />
            repas et vos courses de manière intelligente.
          </TypographyLead>
        </div>
        <div className="grid gap-4 grid-rows-2 grid-flow-col my-[100px]">
          <FeatureCard
            icon="💡"
            title="Trouvez des idées de recettes"
            description="Recherchez par ingrédients, catégories, ou simplement inspirez-vous des suggestions quotidiennes."
          />
          <FeatureCard
            icon="♻️"
            title="Évitez le gaspillage alimentaire"
            description="Recevez des suggestions de recettes pour utiliser les excédents d'ingrédients et éviter le gaspillage."
          />

          <FeatureCard
            icon="‍‍👨🏻‍🎨"
            title="Organisez vos propres recettes"
            description="Créez et importez vos recettes favorites depuis d'autres sites de cuisine pour les retrouver facilement."
          />

          <FeatureCard
            icon="💵"
            title="Calculez le coût au supermarché"
            description="Sélectionnez votre magasin préféré et notre application calculera le coût exact des ingrédients pour chaque recette."
          />
          <FeatureCard
            icon="🛒"
            title="Liste de courses intelligente"
            description={
              <>
                Ajoutez automatiquement les produits nécessaires à votre liste
                de courses à partir d&apos;une recette, en fonction du nombre de
                convives, des ingrédients déjà en votre possession et des autres
                repas que vous avez planifiés.
                <br />
                <br />
                Commandez en 1 clic en retrait ou en livraison dans vos
                enseignes préférées.
              </>
            }
            className="row-span-2"
          />
        </div>
        <div
          className="flex flex-col items-center text-center mb-32"
          id="signup"
        >
          <TypographyH1 className="lg:text-4xl mb-3">
            Soyez parmi les premiers à découvrir Kitchu
          </TypographyH1>
          <TypographyLead>
            Inscrivez-vous dès maintenant pour être informé(e) en avant-première
            du
            <br /> lancement de notre application.
          </TypographyLead>
          <div className="mx-auto flex align-center mt-20 w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <UserAuthForm />
          </div>
        </div>
        <TypographyMuted className="text-center mb-5">
          kitchu.co - 2023
        </TypographyMuted>
      </div>
    </div>
  )
}

function RecipeCard({
  name,
  headline,
  price,
  imgSrc,
  animationDelay,
}: {
  name: string
  headline: string
  price: number
  imgSrc: string
  animationDelay: number
}) {
  return (
    <div
      className="space-y-3 transition-all animate-fade-in opacity-0 w-[240px]"
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <div className="overflow-hidden rounded-md aspect-square relative">
        <Image
          src={imgSrc}
          alt={name}
          fill
          className="object-cover bg-muted"
          quality={25}
          sizes="240px"
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center">
          <TypographyLarge>{price} €</TypographyLarge>
          <TypographyMuted>/ personne</TypographyMuted>
          <div className="h-9 w-9 bg-primary text-white rounded-full flex items-center justify-center ml-auto">
            <Icons.plus />
          </div>
        </div>
        <TypographySmall className="truncate">{name}</TypographySmall>
        <TypographyMuted className="truncate">{headline}</TypographyMuted>
      </div>
    </div>
  )
}

function List() {
  return (
    <Card
      className="z-10 space-y-4 py-4 w-[450px] absolute right-0 bottom-[-50px]  backdrop-blur-lg bg-white/90 transition-all animate-fade-in opacity-0"
      style={{ animationDelay: `500ms` }}
    >
      <TypographyH3 className="px-4" component="div">
        Liste de courses
      </TypographyH3>
      <Separator />
      <div className="px-4">
        <div className="group space-x-3 flex">
          <div className="flex-1 space-y-2">
            <TypographySmall>
              Porc & sauce fraise-balsamique façon brasserie
            </TypographySmall>
            <TypographyMuted>
              avec des pommes de terre rôties & du poireau
            </TypographyMuted>
            <div className="flex space-x-2">
              <div className="border border-input rounded-sm flex">
                <Input
                  placeholder="2"
                  className="w-[60px] text-center p-0 px-2 border-none z-10  h-[30px]"
                  type="number"
                />
              </div>
              <Button
                variant="ghost"
                className="p-2 h-[32px]"
                aria-label="trash"
              >
                <Icons.trash className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="overflow-hidden rounded-sm aspect-square relative w-16 h-16 ">
            <Image
              src="/recipe3.jpeg"
              alt="Liste"
              fill
              className="object-cover bg-muted"
              quality={25}
              placeholder="empty"
              sizes="64px"
            />
          </div>
        </div>
        <Product
          title="Pomme de terre primeur Spunta, calibre +40mm, catégorie 1, Italie 500 g"
          price={1.48}
          imgSrc="/ingr1.jpeg"
        />
        <Product
          title="Filet de Porc Sans Os tranche, VPF, 3 pièces 450 g environ"
          price={7.49}
          imgSrc="/ingr2.jpeg"
        />
        <Product
          title="Poireau, France 500 g"
          price={1.73}
          info
          imgSrc="/ingr3.jpeg"
        />
        <Product title="Confiture de fraise" imgSrc="/ingr4.jpeg" />
        <Product title="Vinaigre balsamique" imgSrc="/ingr5.jpeg" />
      </div>
      <Separator />
      <div className="px-4">
        <Button className="w-full" role="none">
          Commander sur Carrefour.fr
        </Button>
      </div>
    </Card>
  )
}

function Product({
  title,
  price,
  info = false,
  imgSrc,
}: {
  title: string
  imgSrc: string
  price?: number
  info?: boolean
}) {
  return (
    <div
      className={cn(
        price && "bg-muted",
        !price && "border",
        "my-2 p-3 rounded-lg"
      )}
    >
      <div className="flex items-center gap-4">
        <div className="overflow-hidden rounded-full aspect-square relative w-12 h-12 ">
          <Image
            src={imgSrc}
            alt="Liste"
            fill
            className="object-cover bg-muted"
            quality={25}
            placeholder="empty"
            sizes="48px"
          />
        </div>
        <div className="flex-1 space-y-2 overflow-hidden">
          <TypographySmall className="truncate">{title}</TypographySmall>
          {price ? (
            <TypographySmall className="truncate font-bold">
              {price} €
            </TypographySmall>
          ) : (
            <TypographySmall className="text-primary">
              Vous avez déjà cet ingrédient
            </TypographySmall>
          )}
          {info && (
            <TypographySmall className="font-normal">
              Partagé avec 1 autre(s) recette(s)
            </TypographySmall>
          )}
        </div>
      </div>
    </div>
  )
}

function FeatureCard({
  className,
  icon,
  title,
  description,
}: {
  className?: string
  icon: string
  title: string
  description: React.ReactNode
}) {
  return (
    <Card className={cn("p-5 space-y-1", className)}>
      <TypographyLarge className="text-xl">{icon}</TypographyLarge>
      <TypographyLarge>{title}</TypographyLarge>
      <TypographyP className="text-muted-foreground">{description}</TypographyP>
    </Card>
  )
}
