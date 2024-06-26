import { z } from "zod";

export const editProfileSchema = z
  .object({
    name: z
      .string()
      .min(2, "Tamanho mínimo de 2 caracteres")
      .max(50, "Tamanho máximo de 50 caracteres"),
  })
  .partial();

export type TEditProfileSchema = z.infer<typeof editProfileSchema>;
