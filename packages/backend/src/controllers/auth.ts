import express, { Router, Request, Response } from "express"

const authController: Router = express.Router()

export function loginUser(req: Request, res: Response) {}

// Login User
authController.post("/loginUser", loginUser)

export default authController
