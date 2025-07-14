import { z } from "zod"

export const playerSchema = z.object({
  id: z.number(),
  name: z.string(),
})
