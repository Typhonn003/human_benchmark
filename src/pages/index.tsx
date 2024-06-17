import { useGameStatusStore, useUserStore } from "@/store";
import { useRouter } from "next/router";
import { useEffect } from "react";

import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  GameCard,
  LoginForm,
  RegisterForm,
  gamesInfo,
} from "@/components";
import { inter, poppins } from "@/fonts";

const Home = () => {
  const router = useRouter();
  const restartGameStats = useGameStatusStore(
    (state) => state.restartGameStats,
  );
  const { user, fetch } = useUserStore();

  useEffect(() => {
    restartGameStats();
    fetch();
  }, [fetch, restartGameStats]);

  const goPlay = () => {
    const names = gamesInfo.map((element) => {
      return element.name;
    });

    const index = Math.floor(Math.random() * names.length);
    router.push(`/game/${names[index]}`);
  };

  if (user) {
    router.push("/profile");
    return null;
  }

  return (
    <main className={`${inter.className} flex flex-col`}>
      <section className="screen-height-without-header flex items-center bg-lime3 tablet:h-auto tablet:py-10">
        <div className="container-width desktop:gap-38 flex max-w-96 flex-col items-center gap-5 tablet:max-w-full tablet:flex-row ">
          <div className="relative flex w-full flex-col items-center gap-4 tablet:w-2/4 laptop:items-start laptop:gap-8 desktop:w-3/5">
            <h1
              className={`${poppins.className} z-10 text-center text-3xl font-semibold smartphone:text-[2.3rem] tablet:text-[2rem] laptop:text-5xl  desktop:text-6xl`}
            >
              Human Benchmark
            </h1>
            <div
              className={`${poppins.className} z-10 w-72 text-xl font-medium text-lime11 smartphone:block laptop:w-full laptop:text-3xl desktop:text-4xl`}
            >
              <p>Se desafie.</p>
              <p className="text-center">Aprimore suas habilidades.</p>
              <p className="text-right">Supere seus limites.</p>
            </div>
            <div className="z-10 flex w-full flex-col justify-between gap-2 smartphone:flex-row smartphone:justify-start tablet:flex-col  laptop:flex-row">
              <Button size="lg" onClick={goPlay}>
                Jogo aleatório
              </Button>
              {
                //<Button size="lg" variant="outline">Ver resultados detalhados</Button>
              }
            </div>
            <div className="absolute -top-4 h-48 w-48 animate-spin-slow rounded-full bg-lime4 smartphone:-top-6 smartphone:h-56 smartphone:w-56 tablet:h-64 tablet:w-64 laptop:-top-4 laptop:left-20 laptop:h-72 laptop:w-72 desktop:-top-4 desktop:left-28 desktop:h-80 desktop:w-80">
              <div className="absolute -bottom-5 -right-5 h-24 w-24 rounded-full bg-lime5 smartphone:h-32 smartphone:w-32 laptop:h-40 laptop:w-40 desktop:h-48 desktop:w-48" />
            </div>
          </div>
          <Card className="z-10 flex w-full flex-col bg-lime2 tablet:w-2/4 desktop:w-2/5">
            <CardHeader>
              <CardTitle className="font-bold">Entrar</CardTitle>
            </CardHeader>
            <CardContent>
              <LoginForm />
            </CardContent>
            <div className="w-full border-b-[1px]" />
            <CardFooter className="p-6">
              <RegisterForm />
            </CardFooter>
          </Card>
        </div>
      </section>
      <section className="py-8">
        <ul className="container-width flex flex-col gap-4 tablet:grid tablet:grid-cols-2 laptop:grid-cols-3">
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
    </main>
  );
};

export default Home;
