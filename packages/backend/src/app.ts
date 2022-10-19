import cors from "cors"
import express, { Application, json, Request, Response } from "express"
import mongoose from "mongoose"
import { config } from "./config/db"
import userRouter from "./routers/user"
import usersRouter from "./routers/users"

const app: Application = express()
app.use(cors())
app.use(json())
const port: number = parseInt(process.env.SERVER_PORT || "4001")

app.use("/", usersRouter)
app.use("/user", userRouter)

app.listen(config.server.port, async function () {
  await mongoose
    .connect(config.mongo.url)
    .then(() => {
      console.log(`database connected`)
    })
    .catch((err) => {
      console.log(`database fail to connect`, err)
    })
  console.log(`App is listening on port ${config.server.port} !`)
})
