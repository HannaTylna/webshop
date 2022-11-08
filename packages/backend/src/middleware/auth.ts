import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"

import { config } from "../config/auth"

const tokenList = new Map<string, JwtPayload>()

export type JwtPayload = {
  username: string | undefined
  userid: string | undefined
  role: 'admin' | 'user' | undefined
}

export type JwtResponse = {
  token: string
  refreshToken: string
  userid: string
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
      try {
        const decoded = jwt.verify(token, config.secret) as JwtPayload
        req.jwt = decoded
      } catch (err) {
        return res
          .status(400)
          .json({ message: "Token expired. Please make a new sign in request" }) // bad token
      }
    } else {
      return res
        .send(400)
        .json({ message: "Bad token. Please check your Authorization header." }) // bad token
    }
  } else {
    return res.sendStatus(401) // missing header
  }
  next()
}

export const adminAuth = (  req: JwtRequest<string>, res: Response, next: NextFunction) => {
  const authHeader: string | undefined = req.header("Authorization")
  if (authHeader) {
    const token = authHeader.split(" ")[1]
    if (token) {
      try {
        const decoded = jwt.verify(token, config.secret) as JwtPayload
        if (decoded.role==='admin') {
          req.jwt = decoded
          next()
        } else {
          return res
          .status(400)
          .json({ message: "admin rights required" })
        }
      } catch (err) {
        return res
          .status(400)
          .json({ message: "Token expired. Please make a new sign in request" }) // bad token
      }
    } else {
      return res
        .send(400)
        .json({ message: "Bad token. Please check your Authorization header." }) // bad token
    }
  } else {
    return res.sendStatus(401) // missing header
  }
}