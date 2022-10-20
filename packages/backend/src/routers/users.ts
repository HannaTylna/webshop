import express, { Router } from "express"
import { getUserInfo, loginUser, updateUserInfo } from "../controllers/auth"
import { signUpUser } from "../controllers/user"
import { authenticateJwtTokenMiddleware } from "../middleware/auth"

const usersRouter: Router = express.Router()

// Sign Up User localhost:4000/user/signUp
usersRouter.post("/signUp", signUpUser)
// Login User
usersRouter.post("/loginUser", loginUser)
usersRouter.use("/info", authenticateJwtTokenMiddleware)
// Get info
usersRouter.get("/info", getUserInfo)
// Update info
usersRouter.patch("/info", updateUserInfo)

export default usersRouter
