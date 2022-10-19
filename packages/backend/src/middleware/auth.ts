import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"

const JWT_SECRET: string = process.env.JWT_TOKEN || "your_jwt_secret"

export type JwtPayload = {
  mail: string | undefined
}
export interface JwtRequest<T> extends Request<T> {
  jwt?: JwtPayload
}

export function createJwtToken(payload: JwtPayload) {
  const token: string = jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" })
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
      const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload
      req.jwt = decoded
    } else {
      return res.sendStatus(400) // bad token
    }
  } else {
    return res.sendStatus(401) // missing header
  }
  next()
}
