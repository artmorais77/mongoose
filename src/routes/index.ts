import { Router } from "express"
import { StoreRoutes } from "./store-routes"
import { userRoutes } from "./user-routes"
import { authRoutes } from "./auth-routes"

export const routes = Router()

routes.use("/stores", StoreRoutes)
routes.use("/users", userRoutes)
routes.use("/auth", authRoutes)