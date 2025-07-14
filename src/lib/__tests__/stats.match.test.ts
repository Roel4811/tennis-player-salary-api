import { SetScore, Match } from "../../types"
import { isMatchFinished, hasPlayerWonMatch, countMatchesPlayed } from "../stats/match"

describe("isMatchFinished", () => {
  it("returns true when the player wins 3 sets", () => {
    const scores: SetScore[] = [
      [6, 2],
      [4, 6],
      [7, 5],
      [5, 7],
      [6, 1],
    ]
    expect(isMatchFinished(scores)).toBe(true)
  })

  it("returns true when the opponent wins 3 sets", () => {
    const scores: SetScore[] = [
      [4, 6],
      [5, 7],
      [5, 7],
    ]
    expect(isMatchFinished(scores)).toBe(true)
  })

  it("returns false when neither has won 3 sets yet", () => {
    const scores: SetScore[] = [
      [6, 4],
      [4, 6],
      [7, 5],
    ]
    expect(isMatchFinished(scores)).toBe(false)
  })

  it("returns false for empty scores", () => {
    expect(isMatchFinished([])).toBe(false)
  })

  it("ignores incomplete sets (e.g., 4–2)", () => {
    const scores: SetScore[] = [
      [6, 2],
      [4, 6],
      [5, 5],
      [6, 1],
    ]
    expect(isMatchFinished(scores)).toBe(false)
  })

  it("short-circuits as soon as match is decided", () => {
    const scores: SetScore[] = [
      [6, 2],
      [6, 1],
      [6, 4],
      [0, 6],
      [0, 6],
    ]
    expect(isMatchFinished(scores)).toBe(true)
  })
})

describe("hasPlayerWonMatch", () => {
  it("returns true if the player wins 3 sets", () => {
    const scores: SetScore[] = [
      [6, 2],
      [4, 6],
      [7, 5],
      [5, 7],
      [6, 1],
    ]
    expect(hasPlayerWonMatch(scores)).toBe(true)
  })

  it("returns false if opponent wins 3 sets", () => {
    const scores: SetScore[] = [
      [6, 4],
      [3, 6],
      [4, 6],
      [2, 6],
    ]
    expect(hasPlayerWonMatch(scores)).toBe(false)
  })

  it("returns false if match is still in progress", () => {
    const scores: SetScore[] = [
      [6, 4],
      [3, 6],
    ]
    expect(hasPlayerWonMatch(scores)).toBe(false)
  })
})

describe("countMatchesPlayed", () => {
  it("counts matches played by the player", () => {
    const matches: Match[] = [
      {
        playerId: 1,
        opponentId: 2,
        result: [
          [6, 2],
          [4, 6],
          [7, 5],
          [5, 7],
          [6, 1],
        ],
        aces: [0, 0],
        smashedRackets: [0, 0],
        doubleFaults: [0, 0],
      },
      {
        playerId: 1,
        opponentId: 3,
        result: [
          [6, 2],
          [4, 6],
          [3, 6],
          [2, 6],
        ],
        aces: [0, 0],
        smashedRackets: [0, 0],
        doubleFaults: [0, 0],
      },
      {
        playerId: 1,
        opponentId: 4,
        result: [
          [6, 0],
          [6, 2],
          [6, 0],
        ],
        aces: [0, 0],
        smashedRackets: [0, 0],
        doubleFaults: [0, 0],
      },
    ]
    expect(countMatchesPlayed(1, matches)).toBe(3)
  })
})
