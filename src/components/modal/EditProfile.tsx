import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TEditProfileSchema, editProfileSchema } from "@/schemas";
import api from "@/services/axios";
import { useState } from "react";
import { destroyCookie } from "nookies";
import { useRouter } from "next/router";

import { FaGear } from "react-icons/fa6";
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

const EditProfile = ({ name, id }: { name: string; id: string }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const router = useRouter();

  const form = useForm<TEditProfileSchema>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: name,
    },
  });

  const onSubmit = async (values: TEditProfileSchema) => {
    try {
      await api.patch(`/users/${id}`, values);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (confirmDelete) {
      try {
        await api.delete(`/users/${id}`);
        destroyCookie(null, "h-benchmark");
        router.push("/");
      } catch (error) {
        console.error(error);
      }
    } else {
      setConfirmDelete(true);
      setTimeout(() => {
        setConfirmDelete(false);
      }, 3000);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="px-2">
          <FaGear className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[90%] rounded-md">
        <DialogHeader className="items-start">
          <DialogTitle>Editar perfil</DialogTitle>
          <DialogDescription>
            Faça mudanças nas suas informações.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
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
            <div className="flex flex-col gap-2">
              <Button type="submit">Salvar mudanças</Button>
              <Button variant="outline" type="button" onClick={handleDelete}>
                {confirmDelete ? "Clique para confirmar" : "Desativar conta"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export { EditProfile };