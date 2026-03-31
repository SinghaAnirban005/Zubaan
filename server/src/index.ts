import express, { Express } from "express"
import dotenv from "dotenv"
import cors from "cors"

import audioRouter from "./routers/audio.router"
import subtitleRouter from "./routers/subtitle.router"
import authRouter from "./routers/auth.router"

import path from 'path'

dotenv.config({
    path: path.resolve(__dirname, "../../.env")
})

const app: Express = express()

app.use(express.json())
app.use(cors({
    origin: "*",
    credentials: true
}))

app.use('/api/v1/audio', audioRouter)
app.use('/api/v1/subtitle', subtitleRouter)
app.use('/api/v1/auth', authRouter)

app.listen(3000)

export { app }
