import express from "express"

const app = express()
const port = 3000

app.get("/salary/player/:id", (_req, res) => {
  const id = _req.params.id
  res.json({ id })
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
