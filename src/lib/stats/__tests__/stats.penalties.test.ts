import { makeMatch } from "../../../__testUtils__/index.ts"
import {
  countPlayerSmashedRackets,
  countPlayerDoubleFaults,
} from "../penalties"

describe("countPlayerSmashedRackets", () => {
  it("counts smashed rackets by the player when player is playerId", () => {
    const match = makeMatch({
      smashedRackets: [1, 2],
      playerId: 1,
      opponentId: 2,
    })
    expect(countPlayerSmashedRackets(match, 1)).toBe(1)
  })

  it("counts smashed rackets by the player when player is opponentId", () => {
    const match = makeMatch({
      smashedRackets: [1, 2],
      playerId: 1,
      opponentId: 2,
    })
    expect(countPlayerSmashedRackets(match, 2)).toBe(2)
  })
})

describe("countPlayerDoubleFaults", () => {
  it("counts double faults by the player when player is playerId", () => {
    const match = makeMatch({
      doubleFaults: [3, 4],
      playerId: 1,
      opponentId: 2,
    })
    expect(countPlayerDoubleFaults(match, 1)).toBe(3)
  })

  it("counts double faults by the player when player is opponentId", () => {
    const match = makeMatch({
      doubleFaults: [3, 4],
      playerId: 1,
      opponentId: 2,
    })
    expect(countPlayerDoubleFaults(match, 2)).toBe(4)
  })
})
