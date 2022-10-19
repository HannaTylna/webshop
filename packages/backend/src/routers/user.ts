import express, { Router } from "express"
import { getUserInfo, updateUserInfo } from "../controllers/auth"
import { authenticateJwtTokenMiddleware } from "../middleware/auth"

const userRouter: Router = express.Router()

userRouter.get("/", getUserInfo)
userRouter.patch("/:id", updateUserInfo)
userRouter.use("/", authenticateJwtTokenMiddleware)

export default userRouter
