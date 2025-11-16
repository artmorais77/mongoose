import { AuthController } from "@/controllers/auth-controller"
import { Router } from "express"

export const authRoutes = Router()
const authController = new AuthController()

authRoutes.get("/", authController.auth)