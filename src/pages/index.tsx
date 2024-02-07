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
        <div className="container-width flex flex-col items-center gap-5 xl:h-80 xl:flex-row xl:justify-between">
          <div className="flex w-full flex-col items-center gap-4 xl:h-full xl:max-w-xl xl:items-start xl:justify-around">
            <h1 className="text-center text-4xl font-semibold xl:text-6xl">
              Human Benchmark
            </h1>
            <div className="w-72 text-xl font-medium text-lime11 xl:w-full xl:text-4xl">
              <p>Se desafie.</p>
              <p className="text-center">Aprimore suas habilidades.</p>
              <p className="text-right">Supere seus limites.</p>
            </div>
            <div className="md xs:flex-row xs: flex w-full flex-col justify-between gap-2 xl:justify-start xl:gap-6">
              <Button size="lg">Iniciar</Button>
              <Button size="lg" variant="outline">
                Ver resultados detalhados
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-4 xl:max-w-96">
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
      <section className="container-width flex flex-col gap-4 pb-6 xl:grid xl:grid-cols-3">
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
