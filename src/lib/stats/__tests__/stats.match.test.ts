import { makeMatch } from "../../../__testUtils__/index.ts"
import { Match } from "../../../types"
import { hasPlayerWonMatch, countMatchesPlayed } from "../match"

describe("hasPlayerWonMatch", () => {
  it("returns true if the player (playerId) wins 3 sets", () => {
    const match = makeMatch({
      playerId: 1,
      opponentId: 2,
      result: [
        [6, 2],
        [4, 6],
        [7, 5],
        [5, 7],
        [6, 1],
      ],
    })

    expect(hasPlayerWonMatch(match, 1)).toBe(true)
    expect(hasPlayerWonMatch(match, 2)).toBe(false)
  })

  it("returns true if the opponent (opponentId) wins 3 sets", () => {
    const match = makeMatch({
      playerId: 1,
      opponentId: 2,
      result: [
        [6, 4],
        [3, 6],
        [4, 6],
        [2, 6],
      ],
    })

    expect(hasPlayerWonMatch(match, 1)).toBe(false)
    expect(hasPlayerWonMatch(match, 2)).toBe(true)
  })

  it("returns false if match is still in progress (no one has won 3 sets)", () => {
    const match = makeMatch({
      playerId: 1,
      opponentId: 2,
      result: [
        [6, 4],
        [3, 6],
      ],
    })

    expect(hasPlayerWonMatch(match, 1)).toBe(false)
    expect(hasPlayerWonMatch(match, 2)).toBe(false)
  })

  it("throws error if currentPlayerId is not part of the match", () => {
    const match = makeMatch({
      playerId: 1,
      opponentId: 2,
      result: [
        [6, 4],
        [3, 6],
      ],
    })

    expect(() => hasPlayerWonMatch(match, 3)).toThrow(
      "Current player is not part of the match"
    )
  })
})

describe("countMatchesPlayed", () => {
  it("counts matches played by the player", () => {
    const matches: Match[] = [
      makeMatch({
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
      }),
      makeMatch({
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
      }),
      makeMatch({
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
      }),
    ]

    expect(countMatchesPlayed(1, matches)).toBe(3)
  })
})
