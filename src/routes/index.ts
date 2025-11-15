import { Router } from "express"
import { StoreRoutes } from "./store-routes"

export const routes = Router()

routes.use("/stores", StoreRoutes)