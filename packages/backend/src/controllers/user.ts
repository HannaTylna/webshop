import express, { Router, Request, Response } from "express"
import { createUser, UserModel } from "../models/users"
import { User } from "@webshop/shared"

const userController: Router = express.Router()
interface CustomRequest<T> extends Request {
  body: T
}

export async function signUpUser(req: CustomRequest<User>, res: Response) {
  const body = req.body as User
  try {
    const exist = await UserModel.findOne({ mail: body.mail })
    if (exist) {
      res.send({ message: "user with this email already exists" })
    } else if (body.mail == "" || body.name == "") {
      res.send({ message: "both name and mail are required" })
    } else {
      let user: User = await createUser(body)
      res.send({ user: user })
    }
  } catch (error) {
    res
      .sendStatus(400)
      .send({ message: "failed to sign up user", error: error })
  }
}

// Sign Up User localhost:4000/user/signUp
userController.post("/signUp", signUpUser)

export default userController
