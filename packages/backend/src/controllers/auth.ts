import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

import { Credentials, User } from "@webshop/shared"

import { UserModel } from "../models/users"
import { JwtRequest, JwtResponse, JwtPayload } from "../middleware/auth"
import { config } from "../config/auth"

const tokenList = new Map<string, JwtResponse>()

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
    email: user.email,
    phoneNumber: user.phoneNumber,
    firstName: user.firstName,
    lastName: user.lastName,
    deliveryAddress: user.deliveryAddress,
    username: user.username,
    userid: user._id,
    role: user.role
  }

  // Create JWT Token
  const token: string = jwt.sign(userData, config.secret, {
    expiresIn: config.tokenLife,
  })

  // Create JWT Refresh Token
  const refreshToken = jwt.sign(userData, config.refreshTokenSecret, {
    expiresIn: config.refreshTokenLife,
  })

  const response: JwtResponse = {
    token: token,
    refreshToken: refreshToken,
    userid: userData.userid as string,
  }
  // Store refresh token and user info in tokenList
  tokenList.set(refreshToken, response)

  res.json(response)
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

export const refreshToken = async (
  req: JwtRequest<Credentials>,
  res: Response
) => {
  const refreshToken: string = req.body?.refreshToken

  if (refreshToken == null) {
    return res.status(403).json({ message: "Refresh Token is required!" })
  }

  try {
    // Check if refreshToken is in tokenList
    if (!tokenList.has(refreshToken)) {
      res.status(403).json({ message: "Refresh token is not in database!" })
      return
    }

    let decoded: JwtPayload
    // Verify refreshToken expiration time has not passed
    try {
      decoded = jwt.verify(
        refreshToken,
        config.refreshTokenSecret
      ) as JwtPayload
    } catch (err) {
      return res.status(400).json({
        message: "Refresh Token expired. Please make a new sign in request",
      })
    }

    // Get user information to create a new token
    const userData = {
      username: decoded.username,
      userid: decoded.userid,
    }

    // Create new access token
    const token: string = jwt.sign(userData, config.secret, {
      expiresIn: config.tokenLife,
    })

    // Return new values
    return res.status(200).json({
      token: token,
      refreshToken: refreshToken,
    })
  } catch (err) {
    return res.status(500).send({ message: err })
  }
}
