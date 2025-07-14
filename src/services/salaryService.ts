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
  MATCHES_PLAYED: (matches) => matches.length,
  MATCHES_WON: (matches) =>
    matches.filter((match) => hasPlayerWonMatch(match.result)).length,
  SETS_WON: (matches) =>
    countPlayerSetsWon(matches.flatMap((match) => match.result)),
  GAMES_WON: (matches) =>
    countGamesWon(matches.flatMap((match) => match.result)),
  ACES: (matches) =>
    matches.reduce((sum, match) => sum + countPlayerAces(match.aces), 0),
  SMASHED_RACKETS: (matches) =>
    matches.reduce(
      (sum, match) => sum + countPlayerSmashedRackets(match.smashedRackets),
      0
    ),
  DOUBLE_FAULTS: (matches) =>
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
