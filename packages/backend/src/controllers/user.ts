import { Request, Response } from "express"
import { createUser, UserModel } from "../models/users"
import { User } from "@webshop/shared"

export const signUpUser = async (req: Request, res: Response) => {
  const body = req.body as User
  try {
    const exist = await UserModel.findOne({ mail: body.mail }).exec()
    if (exist) {
      res.status(400).json({ error: "user with this email already exists" })
    } else if (body.mail == "" || body.name == "") {
      res.status(400).json({ error: "both name and mail are required" })
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
