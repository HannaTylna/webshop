import express, { Router, Request, Response } from "express"

const authController: Router = express.Router()

export function loginUser(req: Request, res: Response) {}

// Login User
authController.post("/auth", loginUser)

export default authController
