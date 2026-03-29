import express, { Express } from "express"
import dotenv from "dotenv"

import audioRouter from "./routers/audio.router"
import subtitleRouter from "./routers/subtitle.router"

import path from 'path'

dotenv.config({
    path: path.resolve(__dirname, "../../.env")
})

const app: Express = express()

app.use(express.json())

app.use('/api/v1/audio', audioRouter)
app.use('/api/v1/subtitle', subtitleRouter)

app.listen(3000)

export { app }
