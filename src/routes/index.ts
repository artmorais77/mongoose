import { Router } from "express"
import { StoreRoutes } from "./store-routes"
import { userRoutes } from "./user-routes"

export const routes = Router()

routes.use("/stores", StoreRoutes)
routes.use("/users", userRoutes)