import * as z from "zod"

export const recipeSchema = z.object({
  name: z.string().min(3).max(50),
  is_public: z.boolean().default(false).optional(),
  steps: z.array(
    z.object({
      instructionsMarkdown: z.string(),
    })
  ),
  ingredients: z.array(
    z.object({
      ingredient_id: z.number(),
      quantity: z.number().positive(),
      unit: z.string(),
    })
  ),
  difficulty: z.number().min(1).max(3).int().optional(),
  prep_duration_min: z.number().positive().optional(),
})
