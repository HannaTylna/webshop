import express, { Router, Request, Response } from "express"
import { UserModel } from "../models/users"
import { Credentials, User } from "@webshop/shared"
import { createJwtToken } from "../auth"

const authController: Router = express.Router()

interface CustomRequest<T> extends Request {
  body: T
}

export async function loginUser(
  req: CustomRequest<Credentials>,
  res: Response
) {
  //  Search for user with email
  let user: User | null = await UserModel.findOne({ mail: req.body.mail })
  if (user == null || user.mail == null) {
    res
      .status(401) // Unauthorized
      .json({ error: "The email does not exist" })
    return
  }

  // Verify password
  if (req.body.password !== user.password) {
    res
      .status(401) // Unauthorized
      .json({ error: "The password is incorrect" })
    return
  }

  // Create JWT Token
  const token: string = createJwtToken({
    user_id: user._id as string,
    name: user.name,
    mail: user.mail as string,
  })

  res.json({ token: token })
}

// Login User
authController.post("/loginUser", loginUser)

export default authController
