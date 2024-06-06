import api from "@/services/axios";
import { useGameStatusStore, useUserStore } from "@/store";
import { useRouter } from "next/router";
import { destroyCookie, parseCookies } from "nookies";
import { useEffect } from "react";

import { EditProfile, gamesData, gamesInfo, GameCard } from "@/components";
import { FaArrowRotateRight } from "react-icons/fa6";

const Profile = () => {
  // verificar se o user existe, caso nao fazer a requisição
  const { user, loadingData, setUser, setLoadingData } = useUserStore();
  const { setFinalScreen, setGameStart, setGameScore, setGameFinished } =
    useGameStatusStore();
  const router = useRouter();
  const cookies = parseCookies();
  const token = cookies["h-benchmark"];

  useEffect(() => {
    const fetcher = async () => {
      try {
        setLoadingData(true);
        api.defaults.headers.common.Authorization = `Bearer ${token}`;
        const response = await api.get("/users/profile");
        setUser(response.data);
      } catch (error) {
        console.error(error);
        setUser(null);
        destroyCookie(null, "h-benchmark");
        router.push("/");
      } finally {
        setLoadingData(false);
      }
    };

    const teste = () => {
      setGameStart(false);
      setFinalScreen(false);
      setGameScore(0);
      setGameFinished(false);
    };

    teste();
    fetcher();
    setFinalScreen(false);
  }, [
    router,
    setLoadingData,
    setUser,
    token,
    setFinalScreen,
    setGameStart,
    setGameScore,
    setGameFinished,
  ]);

  if (loadingData)
    return (
      <div className="mt-11 flex h-[calc(100vh-2.75rem)] w-full items-center justify-center bg-lime3">
        <div className="flex items-center gap-2">
          <p>Carregando</p>
          <span className="animate-spin">
            <FaArrowRotateRight />
          </span>
        </div>
      </div>
    );

  if (user) {
    const firstName = user.name.split(" ")[0];

    let hashMap = new Map<string, number[]>();

    if (user.user_points) {
      user.user_points.forEach(
        (userPoint: { game: { name: string }; points: number }) => {
          const gameName: string = userPoint.game.name;
          const points: number = userPoint.points;

          if (!hashMap.has(gameName)) {
            hashMap.set(gameName, []);
          }

          hashMap.get(gameName)!.push(points);
        },
      );
    }

    interface GameStats {
      name: string;
      maxPoints: number;
      playCount: number;
      averagePoints: number;
    }

    const calculateGameStats = (
      hashMap: Map<string, number[]>,
    ): GameStats[] => {
      const gameStatsArray: GameStats[] = [];

      hashMap.forEach((points, gameName) => {
        const maxPoints = Math.max(...points);
        const playCount = points.length;
        const averagePoints =
          points.reduce((sum, value) => sum + value, 0) / playCount;

        gameStatsArray.push({
          name: gameName,
          maxPoints,
          playCount,
          averagePoints,
        });
      });

      return gameStatsArray;
    };

    const gameStats = calculateGameStats(hashMap);

    return (
      <main className="flex flex-col gap-4">
        <section className="bg-lime3">
          <div className="container-width mt-11 py-3">
            <div className="flex justify-between">
              <h2 className="text-3xl font-semibold text-lime12">
                Olá, @{firstName}!
              </h2>
              <EditProfile name={user.name} id={user.id} />
            </div>
            <p className="text-lg text-lime11">{user.email}</p>
          </div>
        </section>
        <div className="container-width flex flex-col gap-4 tablet:flex-row">
          <section className="tablet:w-5/12">
            <h2 className="mb-4 text-xl font-medium">Pontuação</h2>
            <ul className="flex flex-col gap-4">
              {gameStats.length > 0 ? (
                gameStats.map(
                  (stats) =>
                    gamesData[stats.name] && (
                      <li
                        className="card-animation group flex h-44 w-full flex-col items-center justify-evenly rounded-md border border-lime6 bg-gradient-to-b from-lime3 to-lime5 shadow-md hover:border-lime8"
                        key={stats.name}
                      >
                        <div className="flex w-full items-center justify-evenly">
                          <div className="text-6xl">
                            {gamesData[stats.name].icon}
                          </div>
                          <h3 className="font-bold">
                            {stats.name.toLocaleUpperCase()}
                          </h3>
                        </div>
                        <div className="align-center flex w-full justify-evenly text-center">
                          <div className="flex flex-col">
                            <p className="font-bold">Recorde</p>
                            <span>{stats.maxPoints}</span>
                          </div>
                          <div className="flex flex-col">
                            <p className="font-bold">Já jogado</p>
                            <span>{stats.playCount} vezes</span>
                          </div>
                          <div className="flex flex-col">
                            <p className="font-bold">Média</p>
                            <span>{stats.averagePoints.toFixed(2)}</span>
                          </div>
                        </div>
                      </li>
                    ),
                )
              ) : (
                <div className="rounded-md border border-lime6 bg-lime3 p-2">
                  <h3 className="text-center text-lg text-lime12">
                    Nenhuma pontuação registrada
                  </h3>
                </div>
              )}
            </ul>
          </section>
          <section className="pb-4 tablet:w-7/12">
            <h2 className="mb-4 text-xl font-medium">Lista de jogos</h2>
            <ul className="flex flex-col gap-4">
              {gamesInfo.map(({ icon, name, description, title }) => (
                <GameCard
                  key={name}
                  icon={icon}
                  title={title}
                  name={name}
                  description={description}
                />
              ))}
            </ul>
          </section>
        </div>
      </main>
    );
  }
};

export default Profile;
