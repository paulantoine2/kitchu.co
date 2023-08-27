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
      amount: z.number().positive(),
      unit: z.string(),
    })
  ),
  tags: z.array(z.object({ id: z.string().uuid() })),
  difficulty: z.number().min(1).max(3).int().optional(),
  prep_duration_min: z.number().positive().optional(),
})
