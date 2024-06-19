import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useGameStatusStore, useUserStore } from "@/store";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api from "@/services/axios";

import { Button, GameCard, MetaTags, gamesData, gamesInfo } from "@/components";
import Link from "next/link";
import { inter, poppins } from "@/fonts";

interface IGameInfo {
  name: string;
  id: string;
}

const Game = ({ isMobile }: { isMobile: boolean }) => {
  const router = useRouter();
  const gameName = router.query.game as string | undefined;

  const {
    gameStart,
    setGameStart,
    gameFinished,
    setGameFinished,
    gameScore,
    finalScreen,
    restartGameStats,
  } = useGameStatusStore();
  const { user, fetch } = useUserStore();
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

  useEffect(() => {
    fetch();
  }, [fetch]);

  if (!gameName || !["arrow", "aim", "reaction"].includes(gameName)) {
    return (
      <>
        <MetaTags pageName="404 - Não Encontrado" />
        <main className={`${inter.className} screen-height-without-header`}>
          <div className="container-width flex h-full flex-col items-center justify-center tablet:gap-4">
            <h2
              className={`${poppins.className} text-center text-xl font-medium text-lime12 tablet:text-3xl`}
            >
              Jogo não encontrado
            </h2>
            <h3
              className={`${poppins.className} text-center text-base text-lime11 tablet:text-xl`}
            >
              Mas que tal experimentar um desses?
            </h3>
            <ul className="flex w-full flex-col gap-4 tablet:grid tablet:grid-cols-2 laptop:grid-cols-3">
              {gamesInfo.map(({ icon, name, description, title }) => (
                <Link key={name} href={`/game/${name}`} target="_self">
                  <GameCard
                    icon={icon}
                    title={title}
                    name={name}
                    description={description}
                  />
                </Link>
              ))}
            </ul>
          </div>
        </main>
      </>
    );
  }

  const { gameComponent, icon, name, instructions } = gamesData[gameName];

  return (
    <>
      <MetaTags pageName={name} />
      <main
        className={`${inter.className} screen-height-without-header flex items-center justify-center bg-lime3`}
      >
        {isMobile ? (
          <div className="container-width flex max-w-72 flex-col gap-2 rounded-md bg-lime9 p-6">
            <p className="text-center text-lg font-medium text-lime12">
              Não é possível jogar em dispositivos moveis
            </p>
            <Button variant="outline" onClick={() => router.push("/")}>
              Ir para tela inicial
            </Button>
          </div>
        ) : !gameStart ? (
          <div className="flex h-[500px] w-[500px] flex-col items-center justify-center gap-2 rounded-md bg-lime9">
            <div className="text-9xl">{icon}</div>
            <h3
              className={`${poppins.className} text-3xl font-medium text-lime12`}
            >
              {name}
            </h3>
            <p className="w-[380px] text-center text-lime11">{instructions}</p>
            <div className="flex gap-2 pt-8">
              <Button variant="outline" onClick={() => setGameStart(true)}>
                Iniciar
              </Button>
            </div>
          </div>
        ) : finalScreen ? (
          <div className="flex h-[500px] w-[500px] flex-col items-center justify-center gap-2 rounded-md bg-lime9">
            <h3
              className={`${poppins.className} text-3xl font-medium text-lime12`}
            >
              Fim de jogo
            </h3>
            <p className="text-xl text-lime11">Pontuação final</p>
            <span className="my-4 text-6xl font-medium">{gameScore}</span>
            {user && (
              <p className="text-lg font-medium text-lime12">
                Pontuação enviada
              </p>
            )}
            <Button variant="outline" onClick={() => restartGameStats()}>
              Tentar novamente
            </Button>
          </div>
        ) : (
          gameComponent
        )}
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  let isMobile: boolean = false;
  const userAgent = context.req.headers["user-agent"];

  if (userAgent) {
    isMobile = /Mobi|Android|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test(
      userAgent,
    );
  }

  return {
    props: { isMobile },
  };
};

export default Game;
