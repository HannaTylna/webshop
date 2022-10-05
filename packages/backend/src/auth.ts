import jwt from "jsonwebtoken"

const JWT_SECRET: string = "53gdjnvkjndks83opasdmvur8djcgwuf"

export type JwtPayload = {
  user: string
  name: string
}

function createJwtToken(payload: JwtPayload): string {
  const token: string = jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" })
  return token
}
