import rawData from "../data/player_data_v1.json"
import z from "zod"
import { Player } from "../types"
import { playerSchema } from "../schema/playerSchema"

export const getPlayers = (): Player[] => {
  try {
    const data = rawData[0]
    return z.array(playerSchema).parse(data.players)
  } catch (error) {
    throw new Error("Player data validation failed: " + error)
  }
}