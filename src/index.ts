import express from "express"
import data from "./data/player_data_v1.json"
import { Player } from "./types"
import { findPlayer, findPlayerMatches } from "./lib/players"
import { calcTotalSalary } from "./lib/salary"

const app = express()
const port = 3000

app.get("/salary/player/:id", (_req, res) => {
  const id = _req.params.id

  const player = findPlayer(data.players, Number(id))
  const playerMatches = findPlayerMatches(player.id, data.matches)
  res.json({
    id,
    name: player.name,
    totalSalary: calcTotalSalary(player, playerMatches),
  })
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
