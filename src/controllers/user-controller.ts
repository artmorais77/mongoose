import { Store } from "@/models/Store";
import { User } from "@/models/User";
import {
  user1BodySchema,
  userBodySchema,
  userParamsSchema,
  userQuerySchema,
} from "@/schemas/user-schema";
import { AppError } from "@/utils/AppError";
import { hash } from "bcrypt";
import { Request, Response, NextFunction } from "express";

export class UserController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password, role, storeId } = userBodySchema.parse(
        req.body
      );

      const userExists = await User.findOne({ email: email });

      if (userExists) {
        throw new AppError("Ja existe um usuário com esse email");
      }

      const storeExists = await Store.findOne({ _id: storeId });

      if (!storeExists) {
        throw new AppError("Loja inexistente");
      }

      const encryptedPassword = await hash(password, 10);

      const newUser = await User.create({
        name,
        email,
        password: encryptedPassword,
        role,
        storeId,
      });

      const newUserObj = newUser.toObject();

      const { password: _, ...userWithoutPassword } = newUserObj;

      return res.status(201).json({
        message: "Usuário cadastrado",
        user: userWithoutPassword,
      });
    } catch (error) {
      return next(error);
    }
  }
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const { limit = 10, page = 1 } = userQuerySchema.parse(req.query);

      const skip = (page - 1) * limit;

      const users = await User.find()
        .select("-password")
        .populate("storeId", "name")
        .limit(limit)
        .skip(skip)
        .sort({ createdAt: 1 });

      const usersObj = users.map((users) => users.toObject());

      const totalUsers = await User.countDocuments();

      const totalPages = Math.ceil(totalUsers / limit);

      const hasNextPage = page < totalPages;
      const hasPrevPage = page > 1;

      return res.status(200).json({
        totalUsers: totalUsers,
        totalPages: totalPages,
        hasNextPage: hasNextPage,
        hasPrevPage: hasPrevPage,
        users: usersObj,
      });
    } catch (error) {
      return next(error);
    }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = userParamsSchema.parse(req.params);
      console.log(userId)

      const userExists = await User.findOne({ _id: userId });

      if (!userExists) {
        throw new AppError("Usuário inexistente");
      }

      const { name, email, role, storeId } = user1BodySchema.parse(req.body);

      await User.updateOne(
        { _id: userId },
        {
          $set: {
            name,
            email,
            role,
            storeId,
          },
        }
      );

      const userUpdated = await User.findById({ _id: userId });

      return res.status(200).json({
        message: `Usuário ${userUpdated?.name} atualizado`,
        userUpdated: userUpdated
      })
    } catch (error) {
      return next(error);
    }
  }
  async cancelOrActivate(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = userParamsSchema.parse(req.params);

      const userExists = await User.findById({ _id: userId });

      if (!userExists) {
        throw new AppError("Usuário inexistente");
      }

      const newStatus = !userExists.isActive

      await User.updateOne({_id: userId}, {$set: {
        isActive: newStatus
      }})

      return res.status(200).json({
        message: `Usuário ${userExists.name} foi ${newStatus ? "ativado" : "desativado"}`
      })
    } catch (error) {
      return next(error)
    }
  }
}
