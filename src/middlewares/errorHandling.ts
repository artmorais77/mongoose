import { AppError } from "@/utils/AppError";
import { Request, Response, NextFunction } from "express";
import z, { ZodError } from "zod";

export function errorHandling(
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ message: error.message });
  }
  if (error instanceof ZodError) {
    return res
      .status(400)
      .json({ message: "Error de validação", issues: z.treeifyError(error) });
  }

  return res
    .status(500)
    .json({ message: "Error interno do servidor", error: error.message });
}
