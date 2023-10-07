import * as z from "zod"

export const recipeSchema = z.object({
  name: z.string().min(3).max(100),
  is_public: z.boolean().default(false).optional(),
  picture_data: z.string().optional(),
  steps: z.array(
    z.object({
      instructionsMarkdown: z.string(),
    })
  ),
  ingredients: z.array(
    z.object({
      ingredient: z.object({
        id: z.number(),
        name: z.string(),
        exists: z.literal(true),
        picture_url: z.string().optional().nullable(),
      }),
      quantity: z.number().positive(),
      unit: z.number(),
    })
  ),
  difficulty: z.number().min(1).max(3).int().optional(),
  prep_duration_min: z.number().positive().optional(),
})

export const importRecipeSchema = z.object({
  name: z.string().min(3).max(100),
  is_public: z.boolean().default(false).optional(),
  steps: z.array(
    z.object({
      instructionsMarkdown: z.string(),
    })
  ),
  ingredients: z.array(
    z.object({
      ingredient: z.object({
        id: z.number(),
        name: z.string(),
        exists: z.boolean(),
      }),
      quantity: z.number().positive().optional(),
      unit: z.number().optional(),
    })
  ),
  difficulty: z.number().min(1).max(3).int().optional(),
  prep_duration_min: z.number().positive().optional(),
})
