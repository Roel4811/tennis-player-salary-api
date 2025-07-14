import { countPlayerSmashedRackets, countPlayerDoubleFaults } from "../stats/penalties"

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
