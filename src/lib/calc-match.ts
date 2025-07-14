import { Match } from "../types"

export const countPlayerSetsWon = (scores: [number, number][]): number => {
  return scores.filter(([player]) => {
    return player >= 6
  }).length
}

export const countMatchesPlayed = (
  playerId: number,
  matches: Match[]
): number => matches.filter((match) => match.playerId === playerId).length

export const isMatchFinished = (scores: [number, number][]): boolean => {
  const { playerSets, opponentSets } = scores.reduce(
    (acc, [player, opponent]) => {
      if (player >= 6) acc.playerSets++
      else if (opponent >= 6) acc.opponentSets++
      return acc
    },
    { playerSets: 0, opponentSets: 0 }
  )

  return playerSets === 3 || opponentSets === 3
}

export const hasPlayerWonMatch = (scores: [number, number][]): boolean => {
  const setsWon = scores.reduce(
    (count, [player, opponent]) =>
      player >= 6 && player > opponent ? count + 1 : count,
    0
  )

  return setsWon === 3
}

export const countGamesWon = (scores: [number, number][]): number =>
  scores.reduce((acc, [player]) => acc + player, 0)

export const countPlayerAces = (aces: [number, number]): number => {
  const [playerAces] = aces
  return playerAces
}

export const countPlayerSmashedRackets = (smashedRackets: [number, number]): number => {
  const [playerSmashedRackets] = smashedRackets
  return playerSmashedRackets
}

export const countPlayerDoubleFaults = (doubleFaults: [number, number]): number => {
  const [playerDoubleFaults] = doubleFaults
  return playerDoubleFaults
}