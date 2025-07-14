import express from "express"
import salaryRouter from "./routers/salaryRouter"

const app = express()
const port = 3000

app.use("/salary", salaryRouter)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
