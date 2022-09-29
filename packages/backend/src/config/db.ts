import dotenv from "dotenv"

dotenv.config()
const MONGODB_URL = String(process.env.MONGODB_URL)
const SERVER_PORT = process.env.SERVER_PORT
  ? Number(process.env.SERVER_PORT)
  : 5000

export const config = {
  mongo: {
    url: MONGODB_URL,
  },
  server: {
    port: SERVER_PORT,
  },
}
