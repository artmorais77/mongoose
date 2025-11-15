import { StoreController } from "@/controllers/store-controller"
import { Router } from "express"

export const StoreRoutes = Router()
const storeController = new StoreController()

StoreRoutes.post("/", storeController.create)
StoreRoutes.get("/", storeController.index)
StoreRoutes.put("/:storeId", storeController.update)
StoreRoutes.patch("/:storeId", storeController.cancelOrActivate)