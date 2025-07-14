import { Request, Response } from "express"
import { ZodError } from "zod"
import { getMatches } from "../data/matchData"
import { getPlayers } from "../data/playerData"
import { findPlayer, findPlayerMatches } from "../lib/player"
import { calcTotalSalary } from "../services/salaryService"

export const salaryController = (req: Request, res: Response) => {
  try {
    const players = getPlayers()
    const matches = getMatches()
    const playerId = Number(req.params.id)

    const player = findPlayer(players, playerId)
    if (!player) {
      return res.status(404).json({ error: "Player not found" })
    }
    
    const playerMatches = findPlayerMatches(player.id, matches)
    const result = calcTotalSalary(playerMatches)

    if (!result) {
      return res.status(404).json({ error: "Player not found" })
    }

    res.json(result)
  } catch (error) {
    if (error instanceof ZodError) {
      return res
        .status(400)
        .json({ error: "Invalid data", details: error.issues })
    }
    console.error("Unexpected error:", error)
    return res.status(500).json({ error: "Internal server error" })
  }
}
