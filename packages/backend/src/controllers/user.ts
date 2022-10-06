import express, { Router, Request, Response } from "express"

const userController: Router = express.Router()

export function signUpUser(req: Request, res: Response) {
  res.send({ message: "Sign up user" })
}

// Sign Up User localhost:4000/user/signUp
userController.post("/signUp", signUpUser)

export default userController
