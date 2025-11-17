import { authConfig } from "@/config/auth"
import { AppError } from "@/utils/AppError"
import { verify } from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"

interface ITokenAsPayload {
  userId: string,
  userRole: string,
  storeId: string,
}

export function EnsureAuthenticated( req: Request, _res: Response, next: NextFunction ) {
  try {
    const authHeader = req.headers.authorization

    if(!authHeader) {
      throw new AppError("Token não fornecido")
    }

    const [, token] = authHeader.split(" ")

    if(!token) {
      throw new AppError("Token não fornecido")
    }

    const { userId, userRole, storeId } = verify(token, authConfig.jwt.secret) as ITokenAsPayload
    
    req.user = {
      id: userId,
      role: userRole,
      storeId: storeId,
    }

    return next()
  } catch (error) {
    throw new AppError("Token invalido")
  }
}