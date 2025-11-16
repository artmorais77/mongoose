import { Store } from "@/models/Store";
import {
  storeQuerySchema,
  storeBodySchema,
  storeParamsSchema,
} from "@/schemas/store-schemas";
import { AppError } from "@/utils/AppError";
import { Request, Response, NextFunction } from "express";

export class StoreController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, cnpj, address, email, phone } = storeBodySchema.parse(
        req.body
      );

      const storeExists = await Store.findOne({ cnpj: cnpj });

      if (storeExists) {
        throw new AppError("Ja existe uma loja com esse cnpj");
      }

      const newStore = await Store.create({
        name,
        cnpj,
        address,
        email,
        phone,
      });

      const newStoreObj = newStore.toObject();

      return res.status(201).json({
        message: "Loja criada com sucesso",
        store: newStoreObj,
      });
    } catch (error) {
      return next(error);
    }
  }

  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const { limit = 10, page = 1 } = storeQuerySchema.parse(req.query);

      const skip = (page - 1) * limit;

      const stores = await Store.find()
        .limit(limit)
        .skip(skip)
        .sort({ createdAt: 1 });

      const totalStores = await Store.countDocuments();

      const totalPages = Math.ceil(totalStores / limit);
      const hasNextPage = page < totalPages;
      const hasPrevPage = page > 1;

      return res.status(200).json({
        totalStores: totalStores,
        totalPages: totalPages,
        hasNextPage: hasNextPage,
        hasPrevPage: hasPrevPage,
        stores: stores.map((store) => store.toObject()),
      });
    } catch (error) {
      return next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { storeId } = storeParamsSchema.parse(req.params);

      const storeExists = await Store.findOne({ _id: storeId });

      if (!storeExists) {
        throw new AppError("Loja inexistente");
      }

      const { name, cnpj, address, email, phone } = storeBodySchema.parse(
        req.body
      );

      await Store.updateOne(
        { _id: storeId },
        {
          $set: {
            name,
            cnpj,
            address,
            email,
            phone,
          },
        }
      );

      const updatedStore = await Store.findOne({ _id: storeId });

      const updatedStoreObj = updatedStore?.toObject();

      return res
        .status(200)
        .json({ message: "Loja atualizada", updatedStore: updatedStoreObj });
    } catch (error) {
      return next(error);
    }
  }

  async cancelOrActivate(req: Request, res: Response, next: NextFunction) {
    try {
      const { storeId } = storeParamsSchema.parse(req.params);

      const storeExists = await Store.findOne({ _id: storeId });

      if (!storeExists) {
        throw new AppError("Loja inexistente");
      }

      const storeExistsObj = storeExists.toObject();

      const newStatus = !storeExistsObj.isActive;

      await Store.updateOne(
        { _id: storeId },
        {
          $set: {
            isActive: newStatus,
          },
        }
      );

      return res
        .status(200)
        .json({ message: `A loja ${storeExistsObj.name} foi ${newStatus ? "ativado" : "desativado"}` });
    } catch (error) {
      return next(error);
    }
  }
}
