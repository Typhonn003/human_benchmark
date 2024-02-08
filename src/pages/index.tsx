import { Button } from "@/components/ui/button";

import { InfoCard } from "@/components/cards/infoCard";
import { GameCard } from "@/components/cards/gameCard";

import { FaClock } from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaBook } from "react-icons/fa";
import { FiTarget } from "react-icons/fi";

export default function Home() {
  return (
    <main className="flex flex-col gap-6">
      <section className="flex min-h-screen items-center bg-lime3">
        <div className="container-width tablet:flex-row tablet:max-w-full laptop:gap-20 desktop:gap-38 flex max-w-96 flex-col items-center gap-5">
          <div className="tablet:w-2/4 laptop:items-start desktop:w-3/5 laptop:gap-8 flex w-full flex-col items-center gap-4">
            <h1 className="laptop:text-5xl desktop:text-6xl text-center text-4xl font-semibold">
              Human Benchmark
            </h1>
            <div className="laptop:w-full laptop:text-3xl desktop:text-4xl w-72 text-xl font-medium text-lime11">
              <p>Se desafie.</p>
              <p className="text-center">Aprimore suas habilidades.</p>
              <p className="text-right">Supere seus limites.</p>
            </div>
            <div className="smartphone:flex-row smartphone:justify-start tablet:flex-col laptop:flex-row flex w-full flex-col justify-between gap-2">
              <Button size="lg">Iniciar</Button>
              <Button size="lg" variant="outline">
                Ver resultados detalhados
              </Button>
            </div>
          </div>
          <div className="tablet:w-2/4 desktop:w-2/5 laptop:gap-8 flex flex-col gap-4">
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
          </div>
        </div>
      </section>
      <section className="container-width tablet:grid tablet:grid-cols-2 laptop:grid-cols-3 flex flex-col gap-4 pb-6">
        <GameCard
          icon={<FiTarget />}
          title="Titulo do jogo"
          description="Descrição do jogo"
        />
        <GameCard
          icon={<FiTarget />}
          title="Titulo do jogo"
          description="Descrição do jogo"
        />
        <GameCard
          icon={<FiTarget />}
          title="Titulo do jogo"
          description="Descrição do jogo"
        />
        <GameCard
          icon={<FiTarget />}
          title="Titulo do jogo"
          description="Descrição do jogo"
        />
      </section>
    </main>
  );
}
