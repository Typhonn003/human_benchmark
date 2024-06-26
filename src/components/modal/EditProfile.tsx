import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TEditProfileSchema, editProfileSchema } from "@/schemas";
import api from "@/services/axios";
import { useState } from "react";
import { destroyCookie } from "nookies";
import { useRouter } from "next/router";
import { useUserStore } from "@/store";
import { IUserUpdate } from "@/interfaces/user.interface";

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
  const { user, setUser } = useUserStore();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [infoChanged, setInfoChanged] = useState(false);
  const router = useRouter();

  const form = useForm<TEditProfileSchema>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: name,
    },
  });

  const onSubmit = async (values: TEditProfileSchema) => {
    try {
      const response = await api.patch(`/users/${id}`, values);
      const data: IUserUpdate = response.data;
      setUser({ ...data, user_points: user!.user_points });
      setInfoChanged(true);
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setInfoChanged(false);
      }, 3000);
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
        <Button
          className="px-2"
          variant="default"
          size="icon"
          aria-label="Botão para editar ou desativar o perfil"
        >
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
                  {infoChanged && (
                    <p className="text-sm font-medium text-lime11">
                      Informações alteradas
                    </p>
                  )}
                </FormItem>
              )}
            />
            <div className="bg-red flex flex-col gap-2 tablet:flex-row-reverse tablet:self-end">
              <Button type="submit" disabled={infoChanged}>
                Salvar mudanças
              </Button>
              <Button
                variant="destructive"
                type="button"
                onClick={handleDelete}
              >
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
