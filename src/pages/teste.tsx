import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/services/axios";
import { useEffect, useState } from "react";

interface Iusers {
  name: string;
  id: string;
  username: string;
  email: string;
  active: boolean;
}

export default function Teste() {
  const [data, setData] = useState<null | Iusers[]>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | Error>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await api.get("/users/");
        setData(response.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <main className="flex h-screen items-center justify-center bg-lime3">
      <div>
        {isLoading && <p>Carregando dados...</p>}
        {error && <p>Erro: {error.message}</p>}
        {data && data.map((user) => <p key={user.id}>{user.name}</p>)}
      </div>
    </main>
  );
}
