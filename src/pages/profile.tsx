import { useFetch } from "@/hooks/useFetch";
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

export default function Profile() {
  const router = useRouter();
  const cookies = parseCookies();
  const token = cookies["h-benchmark"];
  console.log(token);
  const { data, isLoading, mutate } = useFetch<IUserScore>(
    "users/profile",
    token,
  );

  if (isLoading) return <div>Buscando dados...</div>;

  if (!data) {
    router.push("/");
    return;
  }

  /* return (
    <ul>
      {data.user_points.map(({ points, id }) => {
        return <li key={id}>{points}</li>;
      })}
    </ul>
  ); */

  return (
    <main className="mt-10">
      <h1>Olá {data.name}</h1>
      <span>Sua pontuação:</span>
      <ul>
        {data.user_points.map(({ points, id, game }) => {
          return (
            <li key={id}>
              {points} ponto no game {game.name}
            </li>
          );
        })}
      </ul>
    </main>
  );
}
