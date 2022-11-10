import cors from "cors"
import express, { Application, json } from "express"
import { setUpMongoDb } from "./models/common"
import router from "./routers/index"
import dotenv from "dotenv"
import multer from "multer"
import bodyParser from 'body-parser'

dotenv.config()
const app: Application = express()
app.use(cors())
app.use(json())
app.use(bodyParser.urlencoded({ extended: true }));
const port: number = parseInt(process.env.SERVER_PORT || "4000")
const mongoUrl: string =
  process.env.MONGODB_URL || "mongodb://localhost:27017/webshop"

app.use("/api", router)

app.listen(port, async function () {
  await setUpMongoDb(mongoUrl)
  console.log(`App is listening on port ${port} !`)
})
