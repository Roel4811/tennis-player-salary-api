import { makeMatch } from "../../__testUtils__/index.ts"
import { calcTotalSalary } from "../salaryService"

jest.mock("../../types", () => ({
  ...jest.requireActual("../../types"),
  REWARDS: {
    MATCH_PLAYED: 10,
    MATCH_WON: 20,
    SET_WON: 5,
    GAME_WON: 2,
    ACE: 1,
    SMASHED_RACKET: -5,
    DOUBLE_FAULT: -2,
  },
}))

describe("calcTotalSalary", () => {
  const matches = [
    makeMatch({
      playerId: 1,
      opponentId: 2,
      result: [
        [6, 3],
        [7, 5],
        [6, 4],
      ],
      aces: [5, 2],
      smashedRackets: [1, 0],
      doubleFaults: [2, 1],
    }),
    makeMatch({
      playerId: 1,
      opponentId: 3,
      result: [
        [6, 4],
        [4, 6],
        [6, 2],
        [3, 6],
        [6, 3],
      ],
      aces: [3, 1],
      smashedRackets: [0, 1],
      doubleFaults: [1, 0],
    }),
  ]

  it("calculates total salary correctly", () => {
    const salary = calcTotalSalary(matches)
    expect(salary).toBe(175)
  })

  it("returns 0 for empty matches", () => {
    expect(calcTotalSalary([])).toBe(0)
  })
})
