import express from 'express'
import { add } from './add'
const app = express()

app.get('/', async (req, res) => {
  res.status(200).json({
    message: 'Testing bun, what a noob I am!!!', sum: add(58, 67)
  })
})

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Running on port ${port}`)
})
