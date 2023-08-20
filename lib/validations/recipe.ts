import * as z from "zod"

export const recipeSchema = z.object({
  name: z.string().min(3).max(50),
  is_public: z.boolean().default(false).optional(),
  steps: z.array(
    z.object({
      index: z.number(),
      images: z.array(z.string().url()),
      instructionsMarkdown: z.string(),
    })
  ),
  tags: z.array(z.string().uuid()),
  cuisine: z.string().uuid(),
  ingredients: z.array(
    z.object({
      ingredient_id: z.string().uuid(),
      amount: z.number(),
      unit: z.string(),
    })
  ),
})
