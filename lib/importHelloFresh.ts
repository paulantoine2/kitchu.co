import { v5 as uuid } from "uuid"

import { Search } from "@/types/hellofresh"

const TAG_NAMESPACE = "6fce2565-e1ee-4b99-9f8c-03c44d7bf4d8"
const RECIPE_NAMESPACE = "a3c53881-173f-4573-b868-37736c7ecbea"
const CUISINE_NAMESPACE = "e046e6d0-5fbc-44a7-8d47-26345e38a894"
const INGREDIENT_NAMESPACE = "d90bd692-d93a-4737-9b58-d7a43ea86159"

export function createRecipeUuid(id: string) {
  return uuid(id, RECIPE_NAMESPACE)
}

export async function fetchHelloFreshRecipe(id: string): Promise<Search> {
  return new Promise((resolve, reject) => {
    const myHeaders = new Headers()
    myHeaders.append("Authorization", process.env.HELLOFRESH_AUTH || "")
    myHeaders.append("Cookie", process.env.HELLOFRESH_COOKIE || "")

    const requestOptions: RequestInit = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    }

    fetch(
      "https://www.hellofresh.fr/gw/recipes/recipes/search?country=FR&locale=fr-FR&take=1&id=" +
        id,
      requestOptions
    )
      .then((response) => {
        if (!response.ok) reject(response.statusText)
        return response.json()
      })
      .then((result) => resolve(result))
      .catch(reject)
  })
}
