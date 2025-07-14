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

const rewardCalculators: Record<
  RewardType,
  (matches: Match[], currentPlayerId: number) => number
> = {
  MATCH_PLAYED: (matches) => matches.length,
  MATCH_WON: (matches, currentPlayerId) =>
    matches.filter((match) => hasPlayerWonMatch(match, currentPlayerId)).length,
  SET_WON: (matches, currentPlayerId) =>
    matches.reduce(
      (sum, match) => sum + countPlayerSetsWon(match, currentPlayerId),
      0
    ),
  GAME_WON: (matches, currentPlayerId) =>
    matches.reduce(
      (sum, match) => sum + countGamesWon(match, currentPlayerId),
      0
    ),
  ACE: (matches, currentPlayerId) =>
    matches.reduce(
      (sum, match) => sum + countPlayerAces(match, currentPlayerId),
      0
    ),
  SMASHED_RACKET: (matches, currentPlayerId) =>
    matches.reduce(
      (sum, match) => sum + countPlayerSmashedRackets(match, currentPlayerId),
      0
    ),
  DOUBLE_FAULT: (matches, currentPlayerId) =>
    matches.reduce(
      (sum, match) => sum + countPlayerDoubleFaults(match, currentPlayerId),
      0
    ),
}

export const calcTotalSalary = (
  matches: Match[],
  currentPlayerId: number
): number => {
  const allRewards = Object.values(REWARD_CATEGORIES).flat()

  return allRewards.reduce((total, rewardKey) => {
    const value = rewardCalculators[rewardKey](matches, currentPlayerId)
    const unit = REWARDS[rewardKey]
    return total + value * unit
  }, 0)
}
