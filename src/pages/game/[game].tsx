import { useRouter } from "next/router";
import { useState } from "react";

import { Games } from "@/components/games";
import { Button } from "@/components/ui/button";

export default function Game() {
  const router = useRouter();
  const gameName = router.query.game as string | undefined;
  const [start, setStart] = useState<boolean>(false);

  if (!gameName || !["arrow", "aim", "reaction"].includes(gameName)) {
    //Redirecionar para a pagina 404 caso o jogo não exista
    return;
  }

  const { gameComponent, icon, name, instructions } = Games[gameName];

  return (
    <main className="flex h-screen items-center justify-center bg-lime3">
      {start ? (
        gameComponent
      ) : (
        <div className="flex h-[500px] w-[500px] flex-col items-center justify-center gap-2 rounded-md bg-lime9">
          <div className="text-9xl">{icon}</div>
          <h3 className="text-3xl font-bold text-lime12 animate-in">{name}</h3>
          <p className="w-[380px] text-center font-semibold text-lime11">
            {instructions}
          </p>
          <div className="flex gap-2 pt-8">
            <Button variant="outline" onClick={() => setStart(true)}>
              Iniciar
            </Button>
            <Button variant="outline">Ver resultados</Button>
          </div>
        </div>
      )}
    </main>
  );
}
