import { Match, Player, REWARDS } from "../types"
import {
  countGamesWon,
  countPlayerAces,
  countPlayerDoubleFaults,
  countPlayerSetsWon,
  countPlayerSmashedRackets,
  hasPlayerWonMatch,
} from "./calc-match"

export const calcTotalSalary = (
  player: Player,
  playerMatches: Match[]
): number => {
  const matchesPlayedSalary = playerMatches.length * REWARDS.MATCH_PLAYED
  const gamesWonSalary =
    countGamesWon(playerMatches.flatMap((match) => match.result)) *
    REWARDS.GAME_WON
  const setsWonSalary =
    countPlayerSetsWon(playerMatches.flatMap((match) => match.result)) *
    REWARDS.SET_WON
  const matchWonSalary =
    playerMatches.filter((match) => hasPlayerWonMatch(match.result)).length *
    REWARDS.MATCH_WON
  const acesSalary =
    playerMatches.reduce((acc, match) => countPlayerAces(match.aces) + acc, 0) *
    REWARDS.ACE
  const smashedRacketsSalary =
    playerMatches.reduce(
      (acc, match) => countPlayerSmashedRackets(match.smashedRackets) + acc,
      0
    ) * REWARDS.SMASHED_RACKET

  const doubleFaultsSalary =
    playerMatches.reduce(
      (acc, match) => countPlayerDoubleFaults(match.doubleFaults) + acc,
      0
    ) * REWARDS.DOUBLE_FAULT

  const totalSalary =
    matchesPlayedSalary +
    gamesWonSalary +
    setsWonSalary +
    matchWonSalary +
    acesSalary +
    smashedRacketsSalary +
    doubleFaultsSalary

  return totalSalary
}
