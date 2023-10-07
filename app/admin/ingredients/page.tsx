import Link from "next/link"
import { redirect } from "next/navigation"

import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Icons } from "@/components/icons"
import Search from "@/components/layout/search"
import { IngredientImage } from "@/components/recipe/ingredient-image"

export const metadata = {
  title: "Kitchu (admin) - Ingredients",
}

const PER_PAGE = 100

export default async function IngredientsAdminPage({
  searchParams,
}: {
  searchParams: { q: string; page: string }
}) {
  const page = +searchParams.page

  if (isNaN(page) || !page) redirect("/admin/ingredients?page=1")

  const search = searchParams.q

  let query = supabase.from("ingredient").select("*")

  if (search) query = query.textSearch("name", search)

  const { data } = await query.range(
    page * PER_PAGE - PER_PAGE,
    page * PER_PAGE - 1
  )

  return (
    <div>
      <div className="flex flex-row items-between gap-2 my-4">
        <Search />
        <div className="w-full flex flex-row items-center justify-end gap-2">
          Page {page}
          <Button variant="outline" size="sm" asChild>
            <Link
              href={{
                pathname: "/admin/ingredients",
                query: {
                  ...(search ? { q: search } : {}),
                  page: page > 1 ? page - 1 : 1,
                },
              }}
            >
              <Icons.chel className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="sm">
            <Link
              href={{
                pathname: "/admin/ingredients",
                query: {
                  ...(search ? { q: search } : {}),
                  page: page + 1,
                },
              }}
            >
              <Icons.cher className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]"></TableHead>
              <TableHead>Nom</TableHead>
              <TableHead>Categorie</TableHead>
              <TableHead>Créé le</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data &&
              data.map((ingredient) => (
                <TableRow key={ingredient.id}>
                  <TableCell className="p-0">
                    <img
                      width={40}
                      height={40}
                      src={
                        ingredient.picture_url || "/ingredientPlaceholder.svg"
                      }
                    />
                  </TableCell>
                  <TableCell>{ingredient.name}</TableCell>
                  <TableCell>{ingredient.category}</TableCell>
                  <TableCell>
                    {new Intl.DateTimeFormat().format(
                      new Date(ingredient.created_at)
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {
                      <Button asChild variant="outline" size="sm">
                        <Link href={"/admin/ingredients/" + ingredient.id}>
                          Edit
                        </Link>
                      </Button>
                    }
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
