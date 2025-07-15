import { Match } from "../types"

export const getPlayerIndex = (match: Match, currentPlayerId: number): number => {
  return match.playerId === currentPlayerId ? 0 : 1
}