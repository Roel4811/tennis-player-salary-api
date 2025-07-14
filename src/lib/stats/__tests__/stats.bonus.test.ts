import { Match, Result } from "../../../types"
import { countPlayerSetsWon, countGamesWon, countPlayerAces } from "../bonus"

const makeMatch = (
  result: Result[],
  aces: [number, number] = [0, 0],
  smashedRackets: [number, number] = [0, 0],
  doubleFaults: [number, number] = [0, 0],
  playerId = 1,
  opponentId = 2
): Match => ({
  playerId,
  opponentId,
  result,
  aces,
  smashedRackets,
  doubleFaults,
})

describe("countPlayerSetsWon", () => {
  it("counts simple won sets correctly", () => {
    const match = makeMatch([
      [6, 2],
      [4, 6],
      [7, 5],
      [5, 7],
      [6, 1],
    ])
    expect(countPlayerSetsWon(match, 1)).toBe(3)
  })

  it("returns 0 when no sets are completed", () => {
    const match = makeMatch([
      [3, 2],
      [2, 3],
      [4, 4],
    ])
    expect(countPlayerSetsWon(match, 1)).toBe(0)
  })

  it("returns 0 when player has not won any completed sets", () => {
    const match = makeMatch([
      [2, 6],
      [5, 7],
    ])
    expect(countPlayerSetsWon(match, 1)).toBe(0)
  })

  it("counts only fully won sets (player >= 6)", () => {
    const match = makeMatch([
      [6, 0],
      [6, 4],
      [5, 4],
      [7, 5],
    ])
    expect(countPlayerSetsWon(match, 1)).toBe(3)
  })
})

describe("countGamesWon", () => {
  it("counts total games won by the player", () => {
    const match = makeMatch([
      [6, 4],
      [3, 6],
      [7, 5],
    ])
    expect(countGamesWon(match, 1)).toBe(16)
  })

  it("returns 0 for empty input", () => {
    const match = makeMatch([])
    expect(countGamesWon(match, 1)).toBe(0)
  })
})

describe("countPlayerAces", () => {
  it("counts aces by the player", () => {
    const match = makeMatch([], [3, 2])
    expect(countPlayerAces(match, 1)).toBe(3)
  })
})
