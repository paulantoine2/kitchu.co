import * as z from "zod"

export const recipeSchema = z.object({
  name: z.string().min(3).max(50),
  is_public: z.boolean().default(false).optional(),
  steps: z.array(
    z.object({
      instructionsMarkdown: z.string(),
    })
  ),
  cuisine: z.string().uuid().optional(),
  ingredients: z.array(
    z.object({
      ingredient_id: z.string().uuid(),
      amount: z.number(),
      unit: z.string(),
    })
  ),
})
