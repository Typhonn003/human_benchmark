import Link from "next/link";

export const Header = () => {
  return (
    <header className="fixed top-0 z-20 w-full bg-lime9">
      <div className="container-width mx-auto flex items-center justify-between py-2">
        <Link href="/">
          <h1 className="text-lg font-medium">Human Benchmark</h1>
        </Link>
        <menu>
          <Link className="font-semibold hover:underline" href="/profile">
            Perfil
          </Link>
        </menu>
      </div>
    </header>
  );
};
