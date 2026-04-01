import "dotenv/config"
import express, { Express } from "express"
import cors from "cors"

import audioRouter from "./routers/audio.router"
import subtitleRouter from "./routers/subtitle.router"
import authRouter from "./routers/auth.router"
import { prisma } from "./lib/prisma"

// dotenv.config({
//     path: path.resolve(__dirname, "../../.env")
// })

const app: Express = express()

app.use(express.json())
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))

app.use('/api/v1/audio', audioRouter)
app.use('/api/v1/subtitle', subtitleRouter)
app.use('/api/v1/auth', authRouter)

app.listen(5000)

export { app }
