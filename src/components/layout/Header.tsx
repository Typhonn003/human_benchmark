import Link from "next/link";
import { useUserStore } from "@/store";
import { destroyCookie } from "nookies";
import { useRouter } from "next/router";

import { Button } from "@/components";
import { inter, poppins } from "@/fonts";
import useIsMobile from "@/hooks/useIsMobile";

const Header = () => {
  const { user, destroyUser } = useUserStore();
  const router = useRouter();
  const mobile = useIsMobile();

  const handleLogout = () => {
    destroyUser();
    destroyCookie(null, "h-benchmark");
    router.push("/");
  };

  return (
    <header className={`${inter.className} fixed top-0 z-20 w-full bg-lime9`}>
      <div className="container-width mx-auto flex items-center justify-between py-2">
        <Link href="/">
          <h1 className={`${poppins.className} text-lg font-medium`}>
            {mobile ? "H Benchmark" : "Human Benchmark"}
          </h1>
        </Link>
        {user && (
          <ul className="flex gap-2">
            <li>
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push("/profile")}
              >
                Perfil
              </Button>
            </li>
            <li>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Sair
              </Button>
            </li>
          </ul>
        )}
      </div>
    </header>
  );
};

export { Header };
