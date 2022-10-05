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

export function authenticateJwtTokenMiddleware(
  req: JwtRequest,
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
  console.log("req.jwt.user: #######", req.jwt.user)
  console.log("req.jwt.name: #######", req.jwt.name)
  next()
}

export function loginUser(req: Request, res: Response) {}
