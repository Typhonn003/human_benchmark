import { useEffect } from "react";
import { useRouter } from "next/router";
import { useGameStatusStore, useUserStore } from "@/store";

import { EditProfile, gamesData, gamesInfo, GameCard } from "@/components";
import { FaArrowRotateRight } from "react-icons/fa6";
import { inter, poppins } from "@/fonts";

interface GameStats {
  name: string;
  maxPoints: number;
  playCount: number;
  averagePoints: number;
}

interface UserPoint {
  game: {
    name: string;
  };
  points: number;
}

const calculateGameStats = (userPoints: UserPoint[]): GameStats[] => {
  const hashMap = new Map<string, number[]>();

  userPoints.forEach(({ game: { name }, points }) => {
    if (!hashMap.has(name)) {
      hashMap.set(name, []);
    }
    hashMap.get(name)!.push(points);
  });

  return Array.from(hashMap.entries()).map(([name, points]) => ({
    name,
    maxPoints: name == "arrow" ? Math.max(...points) : Math.min(...points),
    playCount: points.length,
    averagePoints:
      points.reduce((sum, value) => sum + value, 0) / points.length,
  }));
};

const Profile = () => {
  const { user, loadingData, fetch } = useUserStore();
  const { restartGameStats } = useGameStatusStore();
  const router = useRouter();

  useEffect(() => {
    restartGameStats();
    fetch();
  }, [fetch, restartGameStats]);

  if (loadingData) {
    return (
      <div className="screen-height-without-header flex w-full items-center justify-center bg-lime3">
        <div className="flex items-center gap-2">
          <p>Carregando</p>
          <span className="animate-spin">
            <FaArrowRotateRight />
          </span>
        </div>
      </div>
    );
  }

  if (typeof window !== "undefined" && !user) {
    router.push("/");
    return null;
  }

  if (user) {
    const firstName = user.name.split(" ")[0];
    const gameStats = user.user_points
      ? calculateGameStats(user.user_points)
      : [];

    return (
      <main className={`${inter.className} flex flex-col gap-4`}>
        <section className="bg-lime3">
          <div className="container-width mt-11 py-3">
            <div className="flex justify-between">
              <h2
                className={`${poppins.className} text-3xl font-medium text-lime12`}
              >
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
                  <h3
                    className={`${poppins.className} text-center text-lg text-lime12`}
                  >
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
