import { MetadataRoute } from "next"

import { supabase } from "@/lib/supabase"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const recipes = await supabase.from("recipe").select("slug")

  return [
    {
      url: "https://www.kitchu.co",
      lastModified: new Date(),
    },
    {
      url: "https://www.kitchu.co/recipes",
      lastModified: new Date(),
    },
    ...(recipes.data || [])?.map((recipe) => ({
      url: "https://www.kitchu.co/recipes/" + recipe.slug,
      lastModified: new Date(),
    })),
  ]
}
