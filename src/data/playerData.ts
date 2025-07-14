import rawData from "../data/player_data_v1.json"
import z from "zod"
import { Player } from "../types"
import { playerSchema } from "../schema/playerSchema"

// caching players as we're dealing with static json data
let cachedPlayers: Player[]

try {
  const data = rawData[0]
  cachedPlayers = z.array(playerSchema).parse(data.players)
} catch (error) {
  throw new Error("Player data validation failed: " + error)
}

export const getPlayers = (): Player[] => cachedPlayers
