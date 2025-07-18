import { Request, Response } from "express"
import { ZodError } from "zod"
import { getPlayers } from "../data/playerData"
import { getMatches } from "../data/matchData"
import { findPlayer, findPlayerMatches } from "../lib/player"
import { calcTotalSalary } from "../services/salaryService"

export class SalaryController {
  public getPlayerSalary = (req: Request, res: Response): void => {
    try {
      const players = getPlayers()
      const matches = getMatches()
      const playerId = Number(req.params.id)

      const currentPlayer = findPlayer(players, playerId)
      if (!currentPlayer) {
        res.status(404).json({ error: "Player not found" })
        return
      }

      const playerMatches = findPlayerMatches(currentPlayer.id, matches)
      const salary = calcTotalSalary(playerMatches, playerId)

      res.json({ id: playerId, name: currentPlayer.name, salary })
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: "Invalid data", details: error.issues })
        return
      }
      console.error("Unexpected error:", error)
      res.status(500).json({ error: "Internal server error" })
    }
  }
}
