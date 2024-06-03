import { Button } from "@/components/ui/button";

import { InfoCard } from "@/components/cards/infoCard";
import { GameCard } from "@/components/cards/GameCard";

import { FaClock } from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaBook } from "react-icons/fa";
import { FiTarget } from "react-icons/fi";

import LoginForm from "@/components/forms/LoginForm";
import Register from "@/components/forms/Register";

import { gamesInfo } from "@/components/games";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

export default function Home() {
  return (
    <main className="flex flex-col">
      <section className="flex items-center bg-lime3 py-16">
        <div className="container-width desktop:gap-38 flex max-w-96 flex-col items-center gap-5 pt-11 tablet:max-w-full tablet:flex-row laptop:gap-20">
          <div className="relative flex w-full flex-col items-center gap-4 tablet:w-2/4 laptop:items-start laptop:gap-8 desktop:w-3/5">
            <h1 className="z-10 text-center text-3xl font-semibold smartphone:text-[2.3rem] tablet:text-[2rem] laptop:text-5xl  desktop:text-6xl">
              Human Benchmark
            </h1>
            <div className="z-10 hidden w-72 text-xl font-medium text-lime11 smartphone:block laptop:w-full laptop:text-3xl desktop:text-4xl">
              <p>Se desafie.</p>
              <p className="text-center">Aprimore suas habilidades.</p>
              <p className="text-right">Supere seus limites.</p>
            </div>
            <div className="z-10 flex w-full flex-col justify-between gap-2 smartphone:flex-row smartphone:justify-start tablet:flex-col  laptop:flex-row">
              <Button size="lg">Iniciar</Button>
              <Button size="lg" variant="outline">
                Ver resultados detalhados
              </Button>
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
              <Register />
            </CardFooter>
          </Card>
          {/* <div className="z-10 flex flex-col gap-4 tablet:w-2/4 laptop:gap-8 desktop:w-2/5">
            <InfoCard
              icon={<FaClock />}
              title="Titulo 1"
              description="Lorem Ipsum is simply dummy text of the printing."
            />
            <InfoCard
              icon={<BsFillPeopleFill />}
              title="Titulo 2"
              description="Lorem Ipsum is simply dummy text of the printing."
            />
            <InfoCard
              icon={<FaBook />}
              title="Titulo 3"
              description="Lorem Ipsum is simply dummy text of the printing."
            />
          </div> */}
        </div>
      </section>
      <section className="py-8">
        <ul className="container-width flex flex-col gap-4 tablet:grid tablet:grid-cols-2 laptop:grid-cols-3">
          {gamesInfo.map(({ icon, name, description }) => (
            <GameCard
              key={name}
              icon={icon}
              title={name}
              description={description}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}
