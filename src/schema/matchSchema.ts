import z from "zod"

const numberTuple = z.tuple([z.number(), z.number()])

export const matchSchema = z.object({
  playerId: z.number(),
  opponentId: z.number(),
  result: z.array(numberTuple),
  aces: numberTuple,
  smashedRackets: numberTuple,
  doubleFaults: numberTuple,
})
