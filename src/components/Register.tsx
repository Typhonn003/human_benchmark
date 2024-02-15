import { z } from "zod";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z
  .object({
    name: z
      .string()
      .min(2, "Tamanho mínimo de 2 caracteres")
      .max(50, "Tamanho máximo de 50 caracteres"),
    username: z
      .string()
      .min(2, "Tamanho mínimo de 2 caracteres")
      .max(50, "Tamanho máximo de 50 caracteres"),
    email: z
      .string()
      .min(2)
      .max(50, "Tamanho máximo de 50 caracteres")
      .email("Precisa ser um email válido"),
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

export default function Register() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg" className="w-full">
          Criar nova conta
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[90%] rounded-md bg-lime2">
        <DialogHeader className="items-start">
          <DialogTitle className="font-bold">Cadastre-se</DialogTitle>
          <DialogDescription>Rápido e fácil.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2 smartphone:flex-row"
          >
            <div className="flex flex-col gap-2 smartphone:w-1/2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Hidrogênio" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Usuário</FormLabel>
                    <FormControl>
                      <Input placeholder="Hidr0G" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="hidrogenio@mail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="relative flex flex-col gap-2 smartphone:w-1/2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="*********"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar Senha</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="*********"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full smartphone:absolute smartphone:bottom-0"
              >
                Enviar
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
