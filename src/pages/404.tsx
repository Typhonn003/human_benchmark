import { useRouter } from "next/router";
import { useUserStore } from "@/store";
import { useEffect } from "react";

import { Button, MetaTags } from "@/components";
import { inter, poppins } from "@/fonts";

const Custom404Page = () => {
  const { user, fetch } = useUserStore();
  const redirectPath = user ? "/profile" : "/";
  const router = useRouter();

  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <>
      <MetaTags pageName="404 - Não Encontrado" />
      <main
        className={`${inter.className} screen-height-without-header container-width flex items-center justify-center`}
      >
        <div className="flex max-w-96 flex-col gap-4">
          <h2
            className={`${poppins.className} text-center text-4xl font-medium`}
          >
            Que pena...
          </h2>
          <h3 className="text-center text-lg text-lime11">
            Parece que não encontramos o que você estava procurando.{" "}
            <span className="font-semibold">=(</span>
          </h3>
          <Button onClick={() => router.push(redirectPath)}>
            {user ? "Ir para perfil" : "Ir para tela inicial"}
          </Button>
        </div>
      </main>
    </>
  );
};

export default Custom404Page;
