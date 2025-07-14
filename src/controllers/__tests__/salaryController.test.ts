import { Request, Response } from "express"
import { ZodError } from "zod"
import * as playerData from "../../data/playerData"
import * as matchData from "../../data/matchData"
import * as playerLib from "../../lib/player"
import * as salaryService from "../../services/salaryService"
import { SalaryController } from "../salaryController"
import { makeMatch, makePlayer } from "../../__testUtils__/index.ts"

describe("SalaryController", () => {
  const controller = new SalaryController()

  let req: Partial<Request>
  let res: Partial<Response>

  beforeEach(() => {
    req = {
      params: { id: "1" },
    }

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it("should return salary for a valid player", () => {
    const fakePlayer = makePlayer(1, "Player 1")
    const fakeMatches = [
      makeMatch({ opponentId: 1 }),
      makeMatch({ opponentId: 2 }),
    ]

    jest.spyOn(playerData, "getPlayers").mockReturnValue([fakePlayer])
    jest.spyOn(matchData, "getMatches").mockReturnValue(fakeMatches)
    jest.spyOn(playerLib, "findPlayer").mockReturnValue(fakePlayer)
    jest.spyOn(playerLib, "findPlayerMatches").mockReturnValue(fakeMatches)
    jest.spyOn(salaryService, "calcTotalSalary").mockReturnValue(100)

    controller.getPlayerSalary(req as Request, res as Response)

    expect(res.json).toHaveBeenCalledWith({ salary: 100 })
  })

  it("should return 404 if player not found", () => {
    jest.spyOn(playerData, "getPlayers").mockReturnValue([])
    jest.spyOn(playerLib, "findPlayer").mockReturnValue(undefined)

    controller.getPlayerSalary(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({ error: "Player not found" })
  })

  it("should handle ZodError with 400", () => {
    const error = new ZodError([])

    jest.spyOn(playerData, "getPlayers").mockImplementation(() => {
      throw error
    })

    controller.getPlayerSalary(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({
      error: "Invalid data",
      details: error.issues,
    })
  })

  it("should handle unexpected errors with 500", () => {
    jest.spyOn(playerData, "getPlayers").mockImplementation(() => {
      throw new Error("Unexpected")
    })

    const consoleSpy = jest.spyOn(console, "error").mockImplementation()

    controller.getPlayerSalary(req as Request, res as Response)

    expect(consoleSpy).toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({
      error: "Internal server error",
    })
  })
})
