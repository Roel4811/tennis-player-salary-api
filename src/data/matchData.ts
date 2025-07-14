import rawData from "../data/player_data_v1.json"
import z from "zod"
import { Match } from "../types"
import { matchSchema } from "../schema/matchSchema"

export const getMatches = (): Match[] => {
  try {
    const data = rawData[0]
    return z.array(matchSchema).parse(data.matches)
  } catch (error) {
    throw new Error("Match data validation failed: " + error)
  }
}
