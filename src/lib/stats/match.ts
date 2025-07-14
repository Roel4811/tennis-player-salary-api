import { Match } from "../../types"

export const countMatchesPlayed = (
  playerId: number,
  matches: Match[]
): number => matches.filter((match) => match.playerId === playerId).length

export const hasPlayerWonMatch = (
  match: Match,
  currentPlayerId: number
): boolean => {
  const { playerId, opponentId, result } = match

  const isPlayer = currentPlayerId === playerId
  const isOpponent = currentPlayerId === opponentId

  if (!isPlayer && !isOpponent) {
    throw new Error("Current player is not part of the match")
  }

  const setsWon = result.reduce((count, [playerScore, opponentScore]) => {
    const currentScore = isPlayer ? playerScore : opponentScore
    return currentScore >= 6 ? count + 1 : count
  }, 0)

  return setsWon === 3
}
