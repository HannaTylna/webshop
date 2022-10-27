import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"

import { config } from "../config/auth"

export type JwtPayload = {
  username: string | undefined
  userid: string | undefined
}
export interface JwtRequest<T> extends Request<T> {
  jwt?: JwtPayload
}

export function createJwtToken(payload: JwtPayload) {
  const token: string = jwt.sign(payload, config.secret, {
    expiresIn: config.tokenLife,
  })
  return token
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
      req.jwt = decoded
    } else {
      return res.sendStatus(400) // bad token
    }
  } else {
    return res.sendStatus(401) // missing header
  }
  next()
}
