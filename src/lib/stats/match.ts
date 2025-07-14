import { Match, Result } from "../../types"

export const countMatchesPlayed = (
  playerId: number,
  matches: Match[]
): number => matches.filter((match) => match.playerId === playerId).length

export const hasPlayerWonMatch = (scores: Result[]): boolean => {
  const setsWon = scores.reduce(
    (count, [player, opponent]) =>
      player >= 6 && player > opponent ? count + 1 : count,
    0
  )

  return setsWon === 3
}
