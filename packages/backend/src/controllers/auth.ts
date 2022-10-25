import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

import { Credentials, User } from "@webshop/shared"

import { UserModel } from "../models/users"
import { JwtRequest } from "../middleware/auth"
import { config } from "../config/auth"

export const loginUser = async (
  req: JwtRequest<Credentials>,
  res: Response
) => {
  //  Search for user with email
  let user: User | null = await UserModel.findOne({
    username: req.body.username,
  }).exec()
  if (user == null || user.username == null) {
    res
      .status(401) // Unauthorized
      .json({ error: "The username does not exist" })
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

  const userData = {
    username: user.username,
  }

  // Create JWT Token
  const token: string = jwt.sign(userData, config.secret, {
    expiresIn: config.tokenLife,
  })

  // Create JWT Refresh Token
  const refreshToken = jwt.sign(userData, config.refreshTokenSecret, {
    expiresIn: config.refreshTokenLife,
  })

  res.json({ token: token, refreshToken: refreshToken })
}

export const getUserInfo = async (
  req: JwtRequest<string>,
  res: Response
): Promise<void> => {
  {
    const userName = req.jwt?.username
    try {
      const currentUser = await UserModel.findOne({ username: userName }).exec()
      res.status(200).json(currentUser)
    } catch (error) {
      res.status(400).send(error)
    }
  }
}

export const updateUserInfo = async (
  req: JwtRequest<string>,
  res: Response
) => {
  try {
    const userName = req.jwt?.username
    const { email, firstName, lastName, phoneNumber, deliveryAddress } =
      req.body
    const updateUser = await UserModel.findOneAndUpdate(
      { username: userName },
      {
        email: email,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        deliveryAddress: deliveryAddress,
      },
      { returnDocument: "after" }
    )
    res.status(200).json(updateUser)
  } catch (error) {
    res.status(400).send(error)
  }
}
