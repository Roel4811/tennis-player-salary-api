export type Score = [number, number]

export type Match = {
  playerId: number
  opponentId: number
  result: Score
  aces: number[]
  smashedRackets: number[]
  doubleFaults: number[]
}

export type Player = {
  id: number
  name: string
}