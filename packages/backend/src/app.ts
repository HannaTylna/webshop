import cors from "cors"
import express, { Application, json, Request, Response } from "express"
import mongoose from "mongoose"
import { config } from "./config/db"
import router from "./routers/index"

const app: Application = express()
app.use(cors())
app.use(json())
const port: number = parseInt(process.env.SERVER_PORT || "4000")

app.use("/api", router)

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
