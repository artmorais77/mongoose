import { authConfig } from "@/config/auth";
import { User } from "@/models/User";
import { authBodySchema } from "@/schemas/auth-schemas";
import { AppError } from "@/utils/AppError";
import { compare } from "bcrypt";
import { Request, Response, NextFunction } from "express";
import { sign } from "jsonwebtoken";

export class AuthController {
  async auth(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = authBodySchema.parse(req.body);

      const userExists = await User.findOne({ email: email })

      if(!userExists) {
        throw new AppError("O email e/ou senha incorreto")
      }

      const userExistsObj = userExists.toObject()

      const isPasswordValid = await compare(password, userExists.password)

      if(!isPasswordValid) {
        throw new AppError("O email e/ou senha incorreto")
      }

      const { expiresIn, secret } = authConfig.jwt

      const token = sign({ userId: userExistsObj._id, userRole: userExistsObj.role, storeId: userExistsObj.storeId}, secret, {
        expiresIn: expiresIn
      })

      return res.status(200).json({ token: token})
    } catch (error) {
      return next(error)
    }
  }
}
