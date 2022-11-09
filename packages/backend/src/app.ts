import cors from "cors"
import express, { Application, json } from "express"
import { setUpMongoDb } from "./models/common"
import router from "./routers/index"
import dotenv from "dotenv"
import multer from "multer"

dotenv.config()

const app: Application = express()
app.use(cors())
app.use(json())
const port: number = parseInt(process.env.SERVER_PORT || "4000")
const mongoUrl: string =
  process.env.MONGODB_URL || "mongodb://localhost:27017/webshop"

const storage = multer.diskStorage({
  destination: "uploads",
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage: storage })
app.use(upload.array("files"))
app.use("/api/uploads", express.static("./uploads"))

app.use("/api", router)

app.listen(port, async function () {
  await setUpMongoDb(mongoUrl)
  console.log(`App is listening on port ${port} !`)
})
