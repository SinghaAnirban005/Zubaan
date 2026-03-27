import express, { Express } from "express"
import dotenv from "dotenv"
import audioRouter from "../src/routers/audio.router"

dotenv.config()

const app: Express = express()

app.use(express.json())

app.use('/api/v1/audio', audioRouter)

app.listen(3000)

export { app }
