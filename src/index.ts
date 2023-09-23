import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import { noRoute } from './middleware/no-route-handle'
import errorHandle from './middleware/error-handle'
import router from './routes'
import { pgInstance } from './db/pg'
const app = express()
const baseUrl = '/api'

app.use(bodyParser.json({ limit: '10mb' }))
app.use(cors())
app.use(helmet())
app.use(morgan('combined'))
app.options('*', cors())
app.use(baseUrl, router)
app.use(noRoute)
app.use(errorHandle)

const port = process.env.PORT || 3000

app.listen(port, async () => {
  await pgInstance.connect()
  console.log(`Running on port ${port}`)
})
