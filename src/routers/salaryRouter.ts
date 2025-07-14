import { Router } from "express"
import { SalaryController } from "../controllers/salaryController"

const salaryRouter = Router()
const salaryController = new SalaryController()

salaryRouter.get("/salary/player/:id", salaryController.getPlayerSalary)

export default salaryRouter
