import { Button } from "@/components/button/Button";

export default function Home() {
  return (
    <main>
      <section className="min-h-screen bg-lime3">
        <div className="container-width flex flex-col items-center gap-3">
          <h1 className="text-4xl font-semibold">Human Benchmark</h1>
          <div className="w-72 font-medium text-lime11">
            <p className="text-xl">Se desafie.</p>
            <p className="text-center text-xl">Aprimore suas habilidades.</p>
            <p className="text-right text-xl">Supere seus limites.</p>
          </div>
          <div className="flex w-full justify-between">
            <Button>Iniciar</Button>
            <Button variant="borded">Ver resultados detalhados</Button>
          </div>
        </div>
      </section>
    </main>
  );
}
