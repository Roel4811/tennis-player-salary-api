import { SetScore } from "../../types"
import {
  countPlayerSetsWon,
  countGamesWon,
  countPlayerAces,
} from "../stats/bonus"

describe("countPlayerSetsWon", () => {
  it("counts simple won sets correctly", () => {
    const scores: SetScore[] = [
      [6, 2],
      [4, 6],
      [7, 5],
      [5, 7],
      [6, 1],
    ]
    expect(countPlayerSetsWon(scores)).toBe(3)
  })

  it("returns 0 when no sets are completed", () => {
    const scores: SetScore[] = [
      [3, 2],
      [2, 3],
      [4, 4],
    ]
    expect(countPlayerSetsWon(scores)).toBe(0)
  })

  it("returns 0 when player has not won any completed sets", () => {
    const scores: SetScore[] = [
      [2, 6],
      [5, 7],
    ]
    expect(countPlayerSetsWon(scores)).toBe(0)
  })

  it("counts only fully won sets (player >= 6)", () => {
    const scores: SetScore[] = [
      [6, 0],
      [6, 4],
      [5, 4],
      [7, 5],
    ]
    expect(countPlayerSetsWon(scores)).toBe(3)
  })
})

describe("countGamesWon", () => {
  it("counts total games won by the player", () => {
    const scores: [number, number][] = [
      [6, 4],
      [3, 6],
      [7, 5],
    ]
    expect(countGamesWon(scores)).toBe(16)
  })

  it("returns 0 for empty input", () => {
    expect(countGamesWon([])).toBe(0)
  })
})

describe("countGamesWon", () => {
  it("counts total games won by the player", () => {
    const scores: [number, number][] = [
      [6, 4],
      [3, 6],
      [7, 5],
    ]
    expect(countGamesWon(scores)).toBe(16)
  })
})

describe("countPlayerSetsWon", () => {
  it("counts sets won by the player", () => {
    const scores: [number, number][] = [
      [6, 4],
      [3, 6],
      [7, 5],
    ]
    expect(countPlayerSetsWon(scores)).toBe(2)
  })
})

describe("countPlayerAces", () => {
  it("counts aces by the player", () => {
    const aces: [number, number] = [3, 2]
    expect(countPlayerAces(aces)).toBe(3)
  })
})
