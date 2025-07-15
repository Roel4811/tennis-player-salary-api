import { Match } from "../../types"
import { getPlayerIndex } from "../utils"

export const countPlayerSmashedRackets = (
  match: Match,
  currentPlayerId: number
): number => {
  const playerIndex = getPlayerIndex(match, currentPlayerId)
  return match.smashedRackets[playerIndex]
}

export const countPlayerDoubleFaults = (
  match: Match,
  currentPlayerId: number
): number => {
  const playerIndex = getPlayerIndex(match, currentPlayerId)
  return match.doubleFaults[playerIndex]
}
