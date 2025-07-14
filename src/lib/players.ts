import { Match, Player } from "../types"

export const findPlayer = (players: Player[], playerId: number): Player => {
  const player = players.find((p) => p.id === playerId)
  if (!player) throw new Error(`Player with id ${playerId} not found.`)
  return player
}

export const findPlayerMatches = (playerId: number, matches: Match[]): Match[] => {
  return matches.filter((match) => match.playerId === playerId || match.opponentId === playerId)
}