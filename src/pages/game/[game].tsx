import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import { useGameStatusStore, useUserStore } from "@/store";
import { Button, gamesData } from "@/components";
import api from "@/services/axios";

interface IGameInfo {
  name: string;
  id: string;
}

const Game = () => {
  const router = useRouter();
  const gameName = router.query.game as string | undefined;

  const {
    gameStart,
    setGameStart,
    gameFinished,
    setGameFinished,
    gameScore,
    setGameScore,
    finalScreen,
    setFinalScreen,
  } = useGameStatusStore();

  const { user } = useUserStore();
  const [gameId, setGameId] = useState<string | null>(null);

  useEffect(() => {
    const fetchGameId = async (gameName: string) => {
      try {
        const response = await api.get("/games");
        const serverData: IGameInfo[] = response.data.data;
        const gameInfo = serverData.find((game) => game.name === gameName);
        if (gameInfo) {
          setGameId(gameInfo.id);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (gameName) {
      fetchGameId(gameName);
    }
  }, [gameName]);

  useEffect(() => {
    const sendGameScore = async (
      userId: string,
      gameId: string,
      gameScore: number,
    ) => {
      try {
        await api.post("/scores", {
          user_id: userId,
          game_id: gameId,
          points: gameScore,
        });
        setGameFinished(false);
      } catch (error) {
        console.error(error);
      }
    };

    if (gameFinished && gameId && user) {
      sendGameScore(user.id, gameId, gameScore);
    }
  }, [gameFinished, gameId, gameScore, setGameFinished, user]);

  const handleGameRestart = useCallback(() => {
    setGameScore(0);
    setGameStart(false);
    setFinalScreen(false);
  }, [setGameScore, setGameStart, setFinalScreen]);

  if (!gameName || !["arrow", "aim", "reaction"].includes(gameName)) {
    return null;
  }

  const { gameComponent, icon, name, instructions } = gamesData[gameName];

  return (
    <main className="flex h-screen items-center justify-center bg-lime3">
      {!gameStart ? (
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
      ) : finalScreen ? (
        <div className="flex h-[500px] w-[500px] flex-col items-center justify-center gap-2 rounded-md bg-lime9">
          <h3 className="text-3xl font-bold text-lime12">Fim de jogo</h3>
          <p className="text-xl font-semibold text-lime11">Pontuação final</p>
          <span className="my-4 text-6xl">{gameScore}</span>
          {user && (
            <p className="text-lg font-semibold text-lime12">
              Pontuação enviada
            </p>
          )}
          <Button variant="outline" onClick={handleGameRestart}>
            Tentar novamente
          </Button>
        </div>
      ) : (
        gameComponent
      )}
    </main>
  );
};

export default Game;
