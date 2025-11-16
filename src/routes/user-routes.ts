import { UserController } from "@/controllers/user-controller"
import { Router } from "express"

export const userRoutes = Router()
const userController = new UserController()

userRoutes.post("/", userController.create)
userRoutes.get("/", userController.index)
userRoutes.put("/:userId", userController.update)
userRoutes.patch("/:userId", userController.cancelOrActivate)