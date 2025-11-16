import z from "zod";

export const authBodySchema = z.object({
  email: z.email(),
  password: z.string().trim().min(6)
})