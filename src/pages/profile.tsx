import { EditProfile, gamesData } from "@/components";
import useFetch from "@/hooks/useFetch";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";

export interface IUserScore {
  id: string;
  name: string;
  username: string;
  email: string;
  role: string;
  active: boolean;
  user_points: UserPoint[];
}

export interface UserPoint {
  id: string;
  user_id: string;
  game_id: string;
  points: number;
  game: Game;
}

export interface Game {
  id: string;
  name: string;
}

const Profile = () => {
  const router = useRouter();
  const cookies = parseCookies();
  const token = cookies["h-benchmark"];
  const { data, isLoading, mutate } = useFetch<IUserScore>(
    "users/profile",
    token,
  );

  if (isLoading) return <div>Buscando dados...</div>;

  if (!data) {
    router.push("/");
    return;
  }

  const firstName = data.name.split(" ")[0];

  let hashMap = new Map<string, number[]>();

  if (data.user_points) {
    data.user_points.forEach(
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

  const calculateGameStats = (hashMap: Map<string, number[]>): GameStats[] => {
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
            <EditProfile name={data.name} id={data.id} />
          </div>
          <p className="text-lg text-lime11">{data.email}</p>
        </div>
      </section>
      <section className="container-width">
        <ul className="flex flex-col gap-4">
          {gameStats.map((stats) => {
            return (
              gamesData[stats.name] && (
                <li
                  className="card-animation group flex h-44 w-full flex-col items-center justify-evenly rounded-md border border-lime6 bg-gradient-to-b from-lime3 to-lime5 shadow-md hover:border-lime8"
                  key={stats.name}
                >
                  <div className="flex w-full items-center justify-evenly">
                    <div className="text-6xl">{gamesData[stats.name].icon}</div>
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
              )
            );
          })}
        </ul>
      </section>
    </main>
  );
};

export default Profile;
