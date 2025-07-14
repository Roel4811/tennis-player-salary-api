import z from "zod"
import { playerSchema } from "./schema/playerSchema"
import { matchSchema } from "./schema/matchSchema"

export type SetScore = [number, number]

export type Match = z.infer<typeof matchSchema>
export type Player = z.infer<typeof playerSchema>

export const REWARDS = {
  MATCH_PLAYED: 500,
  MATCH_WON: 2500,
  SET_WON: 750,
  GAME_WON: 200,
  ACE: 100,
  SMASHED_RACKET: -500,
  DOUBLE_FAULT: -100,
} as const

export type RewardType = keyof typeof REWARDS

export const REWARD_CATEGORIES = {
  match: ["MATCH_PLAYED", "MATCH_WON"],
  bonus: ["SET_WON", "GAME_WON", "ACE"],
  penalty: ["SMASHED_RACKET", "DOUBLE_FAULT"],
} as const
