import { Match } from "../../types"

export const countPlayerAces = (
  match: Match,
  currentPlayerId: number
): number => {
  const playerIndex = match.playerId === currentPlayerId ? 0 : 1
  return match.aces[playerIndex]
}

export const countPlayerSetsWon = (
  match: Match,
  currentPlayerId: number
): number => {
  const playerIndex = match.playerId === currentPlayerId ? 0 : 1
  return match.result.filter((scores) => scores[playerIndex] >= 6).length
}

export const countGamesWon = (
  match: Match,
  currentPlayerId: number
): number => {
  const playerIndex = match.playerId === currentPlayerId ? 0 : 1
  return match.result.reduce((acc, scores) => acc + scores[playerIndex], 0)
}
