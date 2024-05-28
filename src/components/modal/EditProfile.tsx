import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FaGear } from "react-icons/fa6";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TEditProfileSchema, editProfileSchema } from "@/schemas";
import { api } from "@/services/axios";

export const EditProfile = ({ name, id }: { name: string; id: string }) => {
  const form = useForm<TEditProfileSchema>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: name,
    },
  });

  async function onSubmit(values: TEditProfileSchema) {
    console.log(values);
    try {
      const response = await api.patch(`/users/${id}`, values);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

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
            <DialogFooter>
              <Button type="submit">Salvar mudanças</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
