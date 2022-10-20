import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"

const JWT_SECRET: string = process.env.JWT_TOKEN || "your_jwt_secret"

const tokenList = new Map<string, JwtPayload>()

export type JwtPayload = {
  username: string | undefined
}
export interface JwtRequest<T> extends Request<T> {
  jwt?: JwtPayload
  refreshToken?: JwtPayload
}

export function createJwtToken(payload: JwtPayload) {
  const token: string = jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" })
  tokenList.set(token, payload)
  console.log(tokenList)
  return token
}

export function createRefreshToken(payload: JwtPayload) {
  const token: string = jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" })
  return token
}

export function authenticateJwtTokenMiddleware(
  req: JwtRequest<string>,
  res: Response,
  next: NextFunction
) {
  console.log(tokenList)

  const authHeader: string | undefined = req.header("Authorization")
  if (authHeader) {
    const token = authHeader.split(" ")[1]
    if (token) {
      if (tokenList.has(token)) {
        console.log("Token exists in tokenList")
      } else {
        return res.sendStatus(400) // bad token
      }
      const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload
      req.jwt = decoded
      console.log(decoded)
    } else {
      return res.sendStatus(400) // bad token
    }
  } else {
    return res.sendStatus(401) // missing header
  }
  next()
}
