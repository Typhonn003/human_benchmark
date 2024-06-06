import { useRouter } from "next/router";
import { useGameStatusStore } from "@/store";

import { Button, gamesData } from "@/components";
import { useEffect, useState } from "react";
import api from "@/services/axios";

interface IGameServer {
  id: string;
  name: string;
}

const Game = () => {
  const router = useRouter();
  const [stateGameId, setStateGameId] = useState<string | null>(null);
  const gameName = router.query.game as string | undefined;
  const { gameStart, setGameStart, gameId, setGameId } = useGameStatusStore();

  const teste = async () => {
    try {
      const response = await api.get("/games/");
      const serverData: IGameServer[] = response.data.data;
      const gameInfo = serverData.filter((element) => element.name == gameName);
      console.log(stateGameId);
      setStateGameId(gameInfo[0].id);
      console.log(stateGameId);
      console.log(gameInfo[0].id);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setGameStart(false);
  }, [setGameStart]);

  if (!gameName || !["arrow", "aim", "reaction"].includes(gameName)) {
    //Redirecionar para a pagina 404 caso o jogo não exista
    return;
  }

  const { gameComponent, icon, name, instructions } = gamesData[gameName];

  if (gameStart && !stateGameId) {
    console.log("entrei");
    teste();
  }

  return (
    <main className="flex h-screen items-center justify-center bg-lime3">
      {gameStart ? (
        gameComponent
      ) : (
        <div className="flex h-[500px] w-[500px] flex-col items-center justify-center gap-2 rounded-md bg-lime9">
          <div className="text-9xl">{icon}</div>
          <h3 className="text-3xl font-bold text-lime12 animate-in">{name}</h3>
          <p className="w-[380px] text-center font-semibold text-lime11">
            {instructions}
          </p>
          <div className="flex gap-2 pt-8">
            <Button variant="outline" onClick={() => setGameStart(true)}>
              Iniciar
            </Button>
            <Button variant="outline">Ver resultados</Button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Game;
