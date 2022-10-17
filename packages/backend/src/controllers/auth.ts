import express, { Router, Request, Response } from "express"
import { UserModel } from "../models/users"
import { Credentials, User } from "@webshop/shared"
import { createJwtToken } from "../middleware/auth"
import bcrypt from "bcrypt"

const authController: Router = express.Router()

interface CustomRequest<T> extends Request {
  body: T
}

export async function loginUser(
  req: CustomRequest<Credentials>,
  res: Response
) {
  //  Search for user with email
  let user: User | null = await UserModel.findOne({
    mail: req.body.mail,
  }).exec()
  if (user == null || user.mail == null) {
    res
      .status(401) // Unauthorized
      .json({ error: "The email does not exist" })
    return
  }

  // Verify password

  // Check user password with hashed password stored in the database
  const validPassword = await bcrypt.compare(req.body.password, user.password)

  if (validPassword == false) {
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
authController.get(
  "/:id",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.params.id
      const currentUser = await UserModel.findOne({ _id: userId }).exec()
      res.status(200).json(currentUser)
    } catch (error) {
      res.status(400).send(error)
    }
  }
)
authController.patch("/:id", async (req: Request, res: Response) => {
  try {
    const userId = req.params.id
    const { name, mail, telefonNumber, deliveryAddress } = req.body
    const updateUser = await UserModel.findOneAndUpdate(
      { _id: userId },
      {
        name: name,
        mail: mail,
        telefonNumber: telefonNumber,
        deliveryAddress: deliveryAddress,
      },
      { returnDocument: "after" }
    )
    res.status(200).json(updateUser)
  } catch (error) {
    res.status(400).send(error)
  }
})

export default authController
