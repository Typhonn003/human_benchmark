import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/services/axios";
import { registerSchema } from "@/schemas";
import { useState } from "react";
import axios from "axios";

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components";
import { inter, poppins } from "@/fonts";

const RegisterForm = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    try {
      await api.post("/users/", values);
      setError(null);
      setIsOpen(false);

      form.reset();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        setError("Email já cadastrado");
      }

      console.error(error);
    } finally {
      setTimeout(() => {
        setError(null);
      }, 4000);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className="w-full"
          onClick={() => setIsOpen(true)}
        >
          Criar nova conta
        </Button>
      </DialogTrigger>
      <DialogContent
        className={`${inter.className} w-[90%] rounded-md bg-lime2`}
      >
        <DialogHeader className="items-start">
          <DialogTitle className={`${poppins.className} font-medium`}>
            Cadastre-se
          </DialogTitle>
          <DialogDescription>Rápido e fácil.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2 smartphone:flex-row"
            id="register-form"
          >
            <div className="flex flex-col gap-2 smartphone:w-1/2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu nome" {...field} />
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
                      <Input placeholder="Digite seu email" {...field} />
                    </FormControl>
                    <FormMessage />
                    {error && (
                      <p className="text-[0.8rem] font-medium text-destructive">
                        {error}
                      </p>
                    )}
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
                        placeholder="Digite sua senha"
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
                        placeholder="Confirme sua senha"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
          <Button type="submit" className="w-full" form="register-form">
            Enviar
          </Button>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export { RegisterForm };
