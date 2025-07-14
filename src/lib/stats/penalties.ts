import { Match } from "../../types"

export const countPlayerSmashedRackets = (
  match: Match,
  currentPlayerId: number
): number => {
  const playerIndex = match.playerId === currentPlayerId ? 0 : 1
  return match.smashedRackets[playerIndex]
}

export const countPlayerDoubleFaults = (
  match: Match,
  currentPlayerId: number
): number => {
  const playerIndex = match.playerId === currentPlayerId ? 0 : 1
  return match.doubleFaults[playerIndex]
}
