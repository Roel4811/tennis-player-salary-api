import { Match, Player } from "../types"

export const makePlayer = (id: number, name = "Player"): Player => ({
  id,
  name,
})

export const makeMatch = (overrides: Partial<Match> = {}): Match => ({
  playerId: 1,
  opponentId: 2,
  result: [
    [6, 2],
    [4, 6],
    [7, 5],
    [5, 7],
    [6, 1],
  ],
  aces: [2, 3],
  smashedRackets: [1, 2],
  doubleFaults: [3, 4],
  ...overrides,
})
