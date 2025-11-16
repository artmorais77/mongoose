import z from "zod";

export const userBodySchema = z.object({
  name: z.string().trim().min(2),
  email: z.email(),
  password: z.string().trim().min(6),
  role: z.enum(["customer", "employee", "admin"]),
  storeId: z.string().trim().min(2),
})

export const user1BodySchema = z.object({
  name: z.string().trim().min(2),
  email: z.email(),
  role: z.enum(["customer", "employee", "admin"]),
  storeId: z.string().trim().min(2),
})

export const userQuerySchema = z.object({
  limit: z.coerce.number().optional(),
  page: z.coerce.number().optional(),
})

export const userParamsSchema = z.object({
  userId: z.string().trim()
})