import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"

import { config } from "../config/auth"

const tokenList = new Map<string, JwtPayload>()

export type JwtPayload = {
  username: string | undefined
}

export type JwtResponse = {
  token: string
  refreshToken: string
}

export interface JwtRequest<T> extends Request<T> {
  jwt?: JwtPayload
  refreshToken?: JwtPayload
}

export function authenticateJwtTokenMiddleware(
  req: JwtRequest<string>,
  res: Response,
  next: NextFunction
) {
  const authHeader: string | undefined = req.header("Authorization")
  if (authHeader) {
    const token = authHeader.split(" ")[1]
    if (token) {
      const decoded = jwt.verify(token, config.secret) as JwtPayload
    } else {
      return res.sendStatus(400) // bad token
    }
  } else {
    return res.sendStatus(401) // missing header
  }
  next()
}
