const JWT_SECRET: string = process.env.JWT_TOKEN || "your_jwt_secret"
const JWT_REFRESH_TOKEN_SECRET: string =
  process.env.JWT_REFRESH_TOKEN_SECRET || "your_jwt_refresh_token_secret"

export const config = {
  secret: JWT_SECRET,
  refreshTokenSecret: JWT_REFRESH_TOKEN_SECRET,
  tokenLife: 900,
  refreshTokenLife: 86400,
}
