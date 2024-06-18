import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import api from "@/services/axios";
import { setCookie } from "nookies";
import { loginSchema } from "@/schemas";
import { useRouter } from "next/router";
import { useState } from "react";

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components";

const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState<null | string>(null);
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const login = async (loginData: z.infer<typeof loginSchema>) => {
    try {
      const {
        data: { token },
      } = await api.post("login", loginData);
      setCookie(null, "h-benchmark", token, {
        maxAge: 60 * 30,
        path: "/",
      });

      router.push("/profile");
    } catch (error) {
      console.error(error);
      setError("Email ou senha incorretos");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(login)} className="flex flex-col gap-3">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Digite seu email" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
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
            </FormItem>
          )}
        />
        {error && <FormMessage>{error}</FormMessage>}
        <Button type="submit">Entrar</Button>
      </form>
    </Form>
  );
};

export { LoginForm };
