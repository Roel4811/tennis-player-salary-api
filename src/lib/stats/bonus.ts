import { Match } from "../../types"
import { getPlayerIndex } from "../utils"

export const countPlayerAces = (
  match: Match,
  currentPlayerId: number
): number => {
  const playerIndex = getPlayerIndex(match, currentPlayerId)
  return match.aces[playerIndex]
}

export const countPlayerSetsWon = (
  match: Match,
  currentPlayerId: number
): number => {
  const playerIndex = getPlayerIndex(match, currentPlayerId)
  return match.result.filter((scores) => scores[playerIndex] >= 6).length
}

export const countGamesWon = (
  match: Match,
  currentPlayerId: number
): number => {
  const playerIndex = getPlayerIndex(match, currentPlayerId)
  return match.result.reduce((acc, scores) => acc + scores[playerIndex], 0)
}
