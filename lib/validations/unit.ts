import * as z from "zod"

export const unitSchema = z.object({
  name: z.string(),
  short_name: z.string(),
  internal_name: z.string(),
  ratio_to_mass: z.coerce.number().optional(),
  ratio_to_volume: z.coerce.number().optional(),
})
