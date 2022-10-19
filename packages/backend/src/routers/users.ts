import express, { Router } from "express"
import { loginUser } from "../controllers/auth"
import { signUpUser } from "../controllers/user"

const usersRouter: Router = express.Router()

// Sign Up User localhost:4000/user/signUp
usersRouter.post("/signUp", signUpUser)
// Login User
usersRouter.post("/loginUser", loginUser)

export default usersRouter
