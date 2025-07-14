import { Router } from "express"
import { salaryController } from "../controllers/salaryController"

const salaryRouter = Router()

salaryRouter.get("/salary/player/:id", salaryController)

export default salaryRouter
