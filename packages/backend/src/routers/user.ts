import express, { Router } from "express"
import { getUserInfo, updateUserInfo } from "../controllers/auth"

const userRouter: Router = express.Router()

userRouter.get("/", getUserInfo)
userRouter.patch("/", updateUserInfo)

export default userRouter
