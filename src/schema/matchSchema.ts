import z from "zod"

const scoreSchema = z.tuple([z.number(), z.number()])

export const matchSchema = z.object({
  playerId: z.number(),
  opponentId: z.number(),
  result: z.array(scoreSchema),
  aces: scoreSchema,
  smashedRackets: scoreSchema,
  doubleFaults: scoreSchema,
})
