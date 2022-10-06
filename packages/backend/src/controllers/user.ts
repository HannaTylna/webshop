import express, { Router, Request, Response } from "express"
import { createUser } from "../models/users"
import { User } from "@webshop/shared"

const userController: Router = express.Router()
interface CustomRequest<T> extends Request {
  body: T
}

export async function signUpUser(req: CustomRequest<User>, res: Response) {
  const body = req.body as User
  let user: User = await createUser(body)
  res.send({ user: user })
}

// Sign Up User localhost:4000/user/signUp
userController.post("/signUp", signUpUser)

export default userController
