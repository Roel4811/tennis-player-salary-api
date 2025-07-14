import { Match, Player } from "../types"

export const findPlayer = (players: Player[], playerId: number): Player | undefined => {
  const player = players.find((p) => p.id === playerId)
  return player
}

export const findPlayerMatches = (playerId: number, matches: Match[]): Match[] => {
  return matches.filter((match) => match.playerId === playerId || match.opponentId === playerId)
}