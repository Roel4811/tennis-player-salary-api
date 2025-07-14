import { Result, Match } from "../../../types"
import { hasPlayerWonMatch, countMatchesPlayed } from "../match"

describe("hasPlayerWonMatch", () => {
  it("returns true if the player wins 3 sets", () => {
    const scores: Result[] = [
      [6, 2],
      [4, 6],
      [7, 5],
      [5, 7],
      [6, 1],
    ]
    expect(hasPlayerWonMatch(scores)).toBe(true)
  })

  it("returns false if opponent wins 3 sets", () => {
    const scores: Result[] = [
      [6, 4],
      [3, 6],
      [4, 6],
      [2, 6],
    ]
    expect(hasPlayerWonMatch(scores)).toBe(false)
  })

  it("returns false if match is still in progress", () => {
    const scores: Result[] = [
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
