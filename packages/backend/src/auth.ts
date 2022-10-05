import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"

const JWT_SECRET: string = "53gdjnvkjndks83opasdmvur8djcgwuf"

export type JwtPayload = {
  user: string
  name: string
}
export interface JwtRequest extends Request {
  jwt: JwtPayload
}

function createJwtToken(payload: JwtPayload): string {
  const token: string = jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" })
  return token
}

function authenticateJwtTokenMiddleware(
  req: JwtRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.header("Authorization")
  if (authHeader) {
    const token = authHeader.split(" ")[1]
    if (token) {
      const decoded = jwt.verify(token, JWT_SECRET)
    }
  } else {
    return res.sendStatus(401)
  }
  console.log("req.jwt.user: #######", req.jwt.user)
  console.log("req.jwt.user: #######", req.jwt.name)
  next()
}
