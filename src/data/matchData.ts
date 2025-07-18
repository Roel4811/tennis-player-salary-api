import rawData from "../data/player_data_v1.json"
import z from "zod"
import { Match } from "../types"
import { matchSchema } from "../schema/matchSchema"

// caching matches as we're dealing with static json data
let cachedMatches: Match[]

try {
  const data = rawData[0]
  cachedMatches = z.array(matchSchema).parse(data.matches)
} catch (error) {
  throw new Error("Match data validation failed: " + error)
}

export const getMatches = (): Match[] => cachedMatches
