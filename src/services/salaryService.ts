import {
  countGamesWon,
  countPlayerSetsWon,
  countPlayerAces,
} from "../lib/stats/bonus"
import { hasPlayerWonMatch } from "../lib/stats/match"
import {
  countPlayerSmashedRackets,
  countPlayerDoubleFaults,
} from "../lib/stats/penalties"
import { Match, REWARD_CATEGORIES, REWARDS, RewardType } from "../types"

const rewardCalculators: Record<RewardType, (matches: Match[]) => number> = {
  MATCH_PLAYED: (matches) => matches.length,
  MATCH_WON: (matches) =>
    matches.filter((match) => hasPlayerWonMatch(match.result)).length,
  SET_WON: (matches) =>
    countPlayerSetsWon(matches.flatMap((match) => match.result)),
  GAME_WON: (matches) =>
    countGamesWon(matches.flatMap((match) => match.result)),
  ACE: (matches) =>
    matches.reduce((sum, match) => sum + countPlayerAces(match.aces), 0),
  SMASHED_RACKET: (matches) =>
    matches.reduce(
      (sum, match) => sum + countPlayerSmashedRackets(match.smashedRackets),
      0
    ),
  DOUBLE_FAULT: (matches) =>
    matches.reduce(
      (sum, match) => sum + countPlayerDoubleFaults(match.doubleFaults),
      0
    ),
}

export const calcTotalSalary = (matches: Match[]): number => {
  const allRewards = Object.values(REWARD_CATEGORIES).flat()

  return allRewards.reduce((total, rewardKey) => {
    const value = rewardCalculators[rewardKey](matches)
    const unit = REWARDS[rewardKey]
    return total + value * unit
  }, 0)
}
