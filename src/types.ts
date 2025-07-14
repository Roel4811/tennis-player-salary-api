import z from "zod"
import { playerSchema } from "./schema/playerSchema"
import { matchSchema } from "./schema/matchSchema"

export type Result = [number, number]

export type Match = z.infer<typeof matchSchema>
export type Player = z.infer<typeof playerSchema>

export const REWARDS = {
  MATCHES_PLAYED: 500,
  MATCHES_WON: 2500,
  SETS_WON: 750,
  GAMES_WON: 200,
  ACES: 100,
  SMASHED_RACKETS: -500,
  DOUBLE_FAULTS: -100,
} as const

export type RewardType = keyof typeof REWARDS

export const REWARD_CATEGORIES = {
  match: ["MATCHES_PLAYED", "MATCHES_WON"],
  bonus: ["SETS_WON", "GAMES_WON", "ACES"],
  penalty: ["SMASHED_RACKETS", "DOUBLE_FAULTS"],
} as const
