import { Button } from "@/components/button/Button";

import { InfoCard } from "@/components/cards/InfoCard";
import { GameCard } from "@/components/cards/gameCard";

import { FaClock } from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaBook } from "react-icons/fa";
import { FiTarget } from "react-icons/fi";

export default function Home() {
  return (
    <main className="flex flex-col gap-6">
      <section className="flex min-h-screen items-center bg-lime3">
        <div className="container-width flex flex-col items-center gap-5">
          <h1 className="text-4xl font-semibold">Human Benchmark</h1>
          <div className="w-72 text-xl font-medium text-lime11">
            <p>Se desafie.</p>
            <p className="text-center">Aprimore suas habilidades.</p>
            <p className="text-right">Supere seus limites.</p>
          </div>
          <div className="flex w-full justify-between">
            <Button>Iniciar</Button>
            <Button variant="borded">Ver resultados detalhados</Button>
          </div>
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
      </section>
      <section className="container-width gap6 flex min-h-screen flex-col gap-4">
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
