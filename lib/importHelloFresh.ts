import { v5 as uuid } from "uuid"

import { Category, Item, ItemIngredient, Search, Tag } from "@/types/hellofresh"

import { supabase } from "./supabase"

const TAG_NAMESPACE = "6fce2565-e1ee-4b99-9f8c-03c44d7bf4d8"
const RECIPE_NAMESPACE = "a3c53881-173f-4573-b868-37736c7ecbea"
const CUISINE_NAMESPACE = "e046e6d0-5fbc-44a7-8d47-26345e38a894"
const INGREDIENT_NAMESPACE = "d90bd692-d93a-4737-9b58-d7a43ea86159"

export function createRecipeUuid(id: string) {
  return uuid(id, RECIPE_NAMESPACE)
}

export async function importHelloFreshRecipe(id: string) {
  const res = await fetchHelloFreshRecipe(id)
  await Promise.all([
    importManyRecipes((res as Search).items),
    uploadRecipesImages((res as Search).items),
    uploadIngredientsImages((res as Search).items),
  ])
}

async function importManyRecipes(items: Item[]) {
  try {
    const tags: Record<string, Tag> = {}
    const cuisines: Record<string, Category> = {}
    const ingredients: Record<string, ItemIngredient> = {}
    items.forEach((item) => {
      item.tags.forEach((tag) => {
        tags[tag.id] = tag
      })
      item.cuisines.forEach((cuisine) => {
        cuisines[cuisine.id] = cuisine
      })
      item.ingredients.forEach((ingr) => {
        ingredients[ingr.id] = ingr
      })
    })

    await upsertTags(Object.values(tags))
    await upsertCuisines(Object.values(cuisines))
    await upsertIngredients(Object.values(ingredients))
    const ids = await upsertRecipes(items)

    for (const recipe of items) {
      await upsertQuantity(recipe)
      await upsertRecipeTagRelations(recipe)
      await upsertRecipeCuisineRelations(recipe)
    }
    return ids
  } catch (error) {
    console.error(error)
  }
}

async function upsertTags(tags: Tag[]) {
  console.time("upsertTags")
  const { error } = await supabase.from("tag").upsert(
    tags.map((tag) => ({
      id: uuid(tag.id, TAG_NAMESPACE),
      name: tag.name,
    }))
  )
  console.timeEnd("upsertTags")

  if (error) throw error
}

async function upsertCuisines(cuisines: Category[]) {
  console.time("upsertCuisines")

  const { error } = await supabase.from("cuisine").upsert(
    cuisines.map((cuisine) => ({
      id: uuid(cuisine.id, CUISINE_NAMESPACE),
      name: cuisine.name,
    }))
  )
  console.timeEnd("upsertCuisines")

  if (error) throw error
}

async function upsertIngredients(ingredients: ItemIngredient[]) {
  console.time("upsertIngredients")

  const { error } = await supabase.from("ingredient").upsert(
    ingredients.map((ingr) => ({
      id: uuid(ingr.id, INGREDIENT_NAMESPACE),
      name: ingr.name,
      category: "other",
    }))
  )
  console.timeEnd("upsertIngredients")

  if (error) throw error
}

async function upsertRecipes(recipes: Item[]) {
  console.time("upsertRecipes")
  const { error } = await supabase.from("recipe").upsert(
    recipes.map((recipe) => {
      return {
        id: createRecipeUuid(recipe.id),
        headline: recipe.headline,
        link: recipe.link,
        name: recipe.name,
      }
    })
  )
  console.timeEnd("upsertRecipes")

  if (error) throw error
}

async function upsertQuantity(recipe: Item) {
  console.time("upsertQuantity")

  const recipe_id = createRecipeUuid(recipe.id)
  if (!recipe.yields[1]) return
  const { error } = await supabase.from("quantity").upsert(
    recipe.yields[1].ingredients.map((ingr) => ({
      ingredient_id: uuid(ingr.id, INGREDIENT_NAMESPACE),
      recipe_id,
      unit: ingr.unit || "",
      amount: ingr.amount,
    }))
  )
  console.timeEnd("upsertQuantity")

  if (error) throw error
}

async function upsertRecipeTagRelations(recipe: Item) {
  console.time("upsertRecipeTagRelations")

  const recipe_id = createRecipeUuid(recipe.id)
  const { error } = await supabase.from("recipe_tag").upsert(
    recipe.tags.map((tag) => ({
      tag_id: uuid(tag.id, TAG_NAMESPACE),
      recipe_id,
    }))
  )
  console.timeEnd("upsertRecipeTagRelations")

  if (error) throw error
}

async function upsertRecipeCuisineRelations(recipe: Item) {
  console.time("upsertRecipeCuisineRelations")

  const recipe_id = createRecipeUuid(recipe.id)
  const { error } = await supabase.from("recipe_cuisine").upsert(
    recipe.cuisines.map((cuisine) => ({
      cuisine_id: uuid(cuisine.id, CUISINE_NAMESPACE),
      recipe_id,
    }))
  )
  console.timeEnd("upsertRecipeCuisineRelations")

  if (error) throw error
}

async function uploadRecipesImages(items: Item[]) {
  const remote = `https://img.hellofresh.com/w_1170,q_auto,f_auto,c_limit,fl_lossy/hellofresh_s3`

  for (let recipe of items) {
    if (!recipe.imagePath) return
    const url = remote + recipe.imagePath
    const response = await fetch(url)

    const arrayBuffer = await response.arrayBuffer()

    try {
      const { error } = await supabase.storage
        .from("images")
        .upload(
          `recipe/${uuid(recipe.id, RECIPE_NAMESPACE)}.png`,
          arrayBuffer,
          {
            contentType: "image/png",
          }
        )
      console.log(error)
    } catch (e) {
      console.log("error catched", e)
    }
  }
}

async function uploadIngredientsImages(items: Item[]) {
  const remote = `https://img.hellofresh.com/w_100,q_auto,f_auto,c_limit,fl_lossy/hellofresh_s3`
  const ingredients: Record<string, ItemIngredient> = {}
  items.forEach((item) => {
    item.ingredients.forEach((ingr) => (ingredients[ingr.id] = ingr))
  })

  const values = Object.values(ingredients)
  for (const ingr of values) {
    if (!ingr.imagePath) return
    const url = remote + ingr.imagePath
    console.log(url)
    const response = await fetch(url)

    const arrayBuffer = await response.arrayBuffer()
    try {
      const { error } = await supabase.storage
        .from("images")
        .upload(
          `ingredient/${uuid(ingr.id, INGREDIENT_NAMESPACE)}.png`,
          arrayBuffer,
          {
            contentType: "image/png",
          }
        )
      console.log(error)
    } catch (e) {
      console.log("error catched", e)
    }
  }
}

async function fetchHelloFreshRecipe(id: string) {
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
      .then((response) => response.json())
      .then((result) => resolve(result))
      .catch(reject)
  })
}
