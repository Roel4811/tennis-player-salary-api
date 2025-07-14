export type Score = [number, number]

export type Match = {
  playerId: number
  opponentId: number
  result: Score[]
  aces: [number, number]
  smashedRackets: [number, number]
  doubleFaults: [number, number]
}

export type Player = {
  id: number
  name: string
}

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
