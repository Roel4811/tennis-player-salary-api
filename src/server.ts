import express from "express"
import { findPlayer, findPlayerMatches } from "./lib/player"
import { calcTotalSalary } from "./services/salaryService"
import rawData from "./data/player_data_v1.json"
import { playerSchema } from "./schema/playerSchema"
import z, { ZodError } from "zod"
import { Match, Player } from "./types"
import { matchSchema } from "./schema/matchSchema"
import salaryRouter from "./routers/salaryRouter"

const app = express()
const port = 3000

let players: Player[] = []
let matches: Match[] = []

try {
  const data = rawData[0]
  players = z.array(playerSchema).parse(data.players)
  matches = z.array(matchSchema).parse(data.matches)
  console.log("Data validation succeeded")
} catch (error) {
  if (error instanceof ZodError) {
    console.error("Data validation failed:", error.issues)
  } else {
    console.error("Unexpected error during data parsing:", error)
  }
  process.exit(1)
}

app.get("/salary/player/:id", (_req, res) => {
  const id = _req.params.id

  if (!id) {
    res.status(400).json({ error: "id is required" })
    return
  }

  const player = findPlayer(players, Number(id))
  if (!player) {
    res.status(404).json({ error: "player not found" })
    return
  }

  const playerMatches = findPlayerMatches(player.id, matches)

  res.json({
    id,
    name: player.name,
    totalSalary: calcTotalSalary(playerMatches),
  })
})

app.use("/api", salaryRouter)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
