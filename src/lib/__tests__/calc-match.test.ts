import { Match, Score } from "../../types"
import {
  countPlayerSetsWon,
  isMatchFinished,
  countGamesWon,
  hasPlayerWonMatch,
  countMatchesPlayed,
  countPlayerAces,
  countPlayerSmashedRackets,
  countPlayerDoubleFaults,
} from "../calc-match"

describe("countPlayerSetsWon", () => {
  it("counts simple won sets correctly", () => {
    const scores: Score[] = [
      [6, 2],
      [4, 6],
      [7, 5],
      [5, 7],
      [6, 1],
    ]
    expect(countPlayerSetsWon(scores)).toBe(3)
  })

  it("returns 0 when no sets are completed", () => {
    const scores: Score[] = [
      [3, 2],
      [2, 3],
      [4, 4],
    ]
    expect(countPlayerSetsWon(scores)).toBe(0)
  })

  it("returns 0 when player has not won any completed sets", () => {
    const scores: Score[] = [
      [2, 6],
      [5, 7],
    ]
    expect(countPlayerSetsWon(scores)).toBe(0)
  })

  it("counts only fully won sets (player >= 6)", () => {
    const scores: Score[] = [
      [6, 0],
      [6, 4],
      [5, 4],
      [7, 5],
    ]
    expect(countPlayerSetsWon(scores)).toBe(3)
  })
})

describe("isMatchFinished", () => {
  it("returns true when the player wins 3 sets", () => {
    const scores: Score[] = [
      [6, 2],
      [4, 6],
      [7, 5],
      [5, 7],
      [6, 1],
    ]
    expect(isMatchFinished(scores)).toBe(true)
  })

  it("returns true when the opponent wins 3 sets", () => {
    const scores: Score[] = [
      [4, 6],
      [5, 7],
      [5, 7],
    ]
    expect(isMatchFinished(scores)).toBe(true)
  })

  it("returns false when neither has won 3 sets yet", () => {
    const scores: Score[] = [
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
    const scores: Score[] = [
      [6, 2],
      [4, 6],
      [5, 5],
      [6, 1],
    ]
    expect(isMatchFinished(scores)).toBe(false)
  })

  it("short-circuits as soon as match is decided", () => {
    const scores: Score[] = [
      [6, 2],
      [6, 1],
      [6, 4],
      [0, 6],
      [0, 6],
    ]
    expect(isMatchFinished(scores)).toBe(true)
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

describe("hasPlayerWonMatch", () => {
  it("returns true if the player wins 3 sets", () => {
    const scores: Score[] = [
      [6, 2],
      [4, 6],
      [7, 5],
      [5, 7],
      [6, 1],
    ]
    expect(hasPlayerWonMatch(scores)).toBe(true)
  })

  it("returns false if opponent wins 3 sets", () => {
    const scores: Score[] = [
      [6, 4],
      [3, 6],
      [4, 6],
      [2, 6],
    ]
    expect(hasPlayerWonMatch(scores)).toBe(false)
  })

  it("returns false if match is still in progress", () => {
    const scores: Score[] = [
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

describe("countPlayerSmashedRackets", () => {
  it("counts smashed rackets by the player", () => {
    const smashedRackets: [number, number] = [3, 2]
    expect(countPlayerSmashedRackets(smashedRackets)).toBe(3)
  })
})

describe("countPlayerDoubleFaults", () => {
  it("counts double faults by the player", () => {
    const doubleFaults: [number, number] = [3, 2]
    expect(countPlayerDoubleFaults(doubleFaults)).toBe(3)
  })
})
