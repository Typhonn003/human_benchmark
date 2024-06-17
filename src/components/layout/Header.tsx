import Link from "next/link";
import { useUserStore } from "@/store";
import { destroyCookie } from "nookies";
import { useRouter } from "next/router";

import { Button } from "@/components";
import { inter, poppins } from "@/fonts";

const Header = () => {
  const { user, destroyUser } = useUserStore();
  const router = useRouter();
  const handleLogout = () => {
    destroyUser();
    destroyCookie(null, "h-benchmark");
    router.push("/");
  };

  return (
    <header className={`${inter.className} fixed top-0 z-20 w-full bg-lime9`}>
      <div className="container-width mx-auto flex items-center justify-between py-2">
        <Link href="/">
          <h1 className={`${poppins.className} text-lg font-bold`}>
            Human Benchmark
          </h1>
        </Link>
        {user ? (
          <ul className="flex gap-2">
            <li>
              <Button
                variant="outline"
                className="h-7"
                onClick={() => router.push("/profile")}
              >
                Perfil
              </Button>
            </li>
            <li>
              <Button variant="outline" className="h-7" onClick={handleLogout}>
                Sair
              </Button>
            </li>
          </ul>
        ) : null}
      </div>
    </header>
  );
};

export { Header };
