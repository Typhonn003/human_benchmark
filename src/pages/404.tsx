import { useRouter } from "next/router";

import { Button } from "@/components";
import { useUserStore } from "@/store";
import { useEffect } from "react";

const Custom404Page = () => {
  const { user, fetch } = useUserStore();
  const redirectPath = user ? "/profile" : "/";
  const router = useRouter();

  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <main className="screen-height-without-header container-width flex items-center justify-center">
      <div className="flex max-w-96 flex-col gap-4">
        <h2 className="text-center text-4xl">Que pena...</h2>
        <h3 className="text-center text-lg text-lime11">
          Parece que não encontramos o que você estava procurando.{" "}
          <span className="font-extrabold">=(</span>
        </h3>
        <Button onClick={() => router.push(redirectPath)}>
          {user ? "Ir para perfil" : "Ir para tela inicial"}
        </Button>
      </div>
    </main>
  );
};

export default Custom404Page;
