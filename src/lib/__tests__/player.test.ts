import { findPlayer, findPlayerMatches } from "../player"
import { Player } from "../../types"
import { makeMatch, makePlayer } from "../../__testUtils__/index.ts"
import { getPlayerIndex } from "../utils"

describe("findPlayer", () => {
  const players: Player[] = [makePlayer(1, "Alice"), makePlayer(2, "Bob")]

  it("should return the correct player when the ID exists", () => {
    const player = findPlayer(players, 1)
    expect(player).toEqual(makePlayer(1, "Alice"))
  })

  it("should return undefined when the ID does not exist", () => {
    const player = findPlayer(players, 3)
    expect(player).toBeUndefined()
  })
})

describe("findPlayerMatches", () => {
  const matches = [
    makeMatch({ playerId: 1, opponentId: 2 }),
    makeMatch({ playerId: 2, opponentId: 3 }),
    makeMatch({ playerId: 1, opponentId: 3 }),
  ]

  it("should return matches where the player is either player or opponent", () => {
    const player1Matches = findPlayerMatches(1, matches)
    expect(player1Matches).toHaveLength(2)
    expect(player1Matches.map((m) => m.opponentId)).toEqual([2, 3])
  })

  it("should return an empty array if the player did not participate in any matches", () => {
    const matchesForUnknown = findPlayerMatches(99, matches)
    expect(matchesForUnknown).toEqual([])
  })
})

describe("getPlayerIndex", () => {
  it("returns 0 if currentPlayerId is match.playerId", () => {
    const match = makeMatch({ playerId: 42, opponentId: 99 })
    expect(getPlayerIndex(match, 42)).toBe(0)
  })

  it("returns 1 if currentPlayerId is match.opponentId", () => {
    const match = makeMatch({ playerId: 42, opponentId: 99 })
    expect(getPlayerIndex(match, 99)).toBe(1)
  })

  it("returns 1 for any id not equal to playerId (even if not the opponentId)", () => {
    const match = makeMatch({ playerId: 42, opponentId: 99 })
    expect(getPlayerIndex(match, 77)).toBe(1)
  })
})
