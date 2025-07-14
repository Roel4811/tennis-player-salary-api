import express from "express"
import { findPlayer, findPlayerMatches } from "./lib/players"
import { calcTotalSalary } from "./lib/salary"
import rawData from "./data/player_data_v1.json"
import { matchSchema, playerSchema } from "./schema/schema"
import z from "zod"

const app = express()
const port = 3000

app.get("/salary/player/:id", (_req, res) => {
  const id = _req.params.id

  const data = rawData[0]

  const playerData = data.players
  const matchData = data.matches

  const players = z.array(playerSchema).parse(playerData)
  const matches = z.array(matchSchema).parse(matchData)

  const player = findPlayer(players, Number(id))
  const playerMatches = findPlayerMatches(player.id, matches)
  res.json({
    id,
    name: player.name,
    totalSalary: calcTotalSalary(player, playerMatches),
  })
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
