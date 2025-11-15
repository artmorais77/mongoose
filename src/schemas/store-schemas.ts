import z from "zod";

export const storeBodySchema = z.object({
  name: z
    .string("O nome é obrigatório e deve ser um text Valido")
    .trim()
    .min(2, "O nome deve ter pelo menos 2 caracteres"),
  cnpj: z
    .string("O CNPJ é obrigatório e deve ser uma string")
    .trim()
    .regex(
      /^[0-9]{14}$/,
      "O CNPJ deve ter 14 digitos e não deve ter caracteres, somente números"
    ),
  address: z.object({
    street: z
      .string("Deve ser um texto valido")
      .trim()
      .min(2, "Deve ter pelo menos 2 caracteres"),
    number: z.number("Deve ser um numero"),
    city: z
      .string("Deve ser um texto valido")
      .trim()
      .min(2, "Deve ter pelo menos 2 caracteres"),
    state: z
      .string("Deve ser um texto valido")
      .trim()
      .min(2, "Deve ter pelo menos 2 caracteres"),
    cep: z
      .string("O CEP é obrigatório")
      .trim()
      .regex(/^\d{8}$/, "Deve ter 8 dígitos"),
  }),
  phone: z
    .string("O telefone é obrigatório")
    .trim()
    .regex(/^\d{10,11}$/, "Deve ter 10 ou 11 dígitos"),
  email: z.email("O email é obrigatório e deve ser valido"),
});

export const storeQuerySchema = z.object({
  limit: z.coerce.number().optional(),
  page: z.coerce.number().optional(),
})

export const storeParamsSchema = z.object({
  storeId: z.string()
})
