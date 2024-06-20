import z from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, "Tamanho mínimo de 2 caracteres")
      .max(50, "Tamanho máximo de 50 caracteres"),
    email: z
      .string()
      .min(10, "Precisa ter pelo menos 10 caracteres")
      .max(50, "Tamanho máximo de 50 caracteres")
      .email({
        message: "Email inválido",
      }),
    password: z
      .string()
      .min(8, "Tamanho mínimo de 8 caracteres")
      .regex(/(?=.*?[A-Z])/, "Precisa ter uma letra maiúscula")
      .regex(/(?=.*?[a-z])/, "Precisa ter uma letra minúscula")
      .regex(/(?=.*?[0-9])/, "Precisa conter um número")
      .regex(/(?=.*?[#?!@$%^&*-])/, "Precisa ter um caractere especial")
      .max(50, "Tamanho máximo de 50 caracteres"),
    confirmPassword: z
      .string()
      .min(8, "Tamanho mínimo de 8 caracteres")
      .regex(/(?=.*?[A-Z])/, "Precisa ter uma letra maiúscula")
      .regex(/(?=.*?[a-z])/, "Precisa ter uma letra minúscula")
      .regex(/(?=.*?[0-9])/, "Precisa conter um número")
      .regex(/(?=.*?[#?!@$%^&*-])/, "Precisa ter um caractere especial")
      .max(50, "Tamanho máximo de 50 caracteres"),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "As senhas não correspondem.",
    path: ["confirmPassword"],
  });
