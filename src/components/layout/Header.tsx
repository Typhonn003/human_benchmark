import Link from "next/link";
import { useUserStore } from "@/store";
import { destroyCookie } from "nookies";
import { useRouter } from "next/router";

import { Button } from "@/components";

const Header = () => {
  const { user, setUser } = useUserStore();
  const router = useRouter();
  const handleLogout = () => {
    setUser(null);
    destroyCookie(null, "h-benchmark");
    router.push("/");
  };

  return (
    <header className="fixed top-0 z-20 w-full bg-lime9">
      <div className="container-width mx-auto flex items-center justify-between py-2">
        <Link href="/">
          <h1 className="text-lg font-medium">Human Benchmark</h1>
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
