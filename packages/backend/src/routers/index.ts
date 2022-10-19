import express from "express"
import { authenticateJwtTokenMiddleware } from "../middleware/auth"
import userRouter from "./user"
import usersRouter from "./users"

const router = express.Router()
router.use("/", usersRouter)
router.use("/user", authenticateJwtTokenMiddleware)
router.use("/user", userRouter)

export default router
