import { Match } from "../types"

export const getPlayerIndex = (
  match: Match,
  currentPlayerId: number
): number => {
  if (currentPlayerId === match.playerId) return 0
  if (currentPlayerId === match.opponentId) return 1
  throw new Error(
    `Player ID ${currentPlayerId} is not part of the match (expected ${match.playerId} or ${match.opponentId})`
  )
}
