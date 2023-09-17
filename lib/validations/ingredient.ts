import * as z from "zod"

export const ingredientSchema = z.object({
  name: z.string().min(3).max(100),
  category: z.string(),
  picture_data: z.string().optional(),
})
