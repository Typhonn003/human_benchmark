import { useRouter } from "next/router";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useState } from "react";

const Dropdown = () => {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="link" className="text-lime12np p-0 text-2xl">
          <GiHamburgerMenu />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onSelect={() => router.push("/login")}>
          Entrar
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => router.push("/register")}>
          Registro
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const Header = () => {
  const isMobileWidth = () => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 640;
    }
  };

  const [isMobile, setIsMobile] = useState(isMobileWidth());
  const router = useRouter();

  useEffect(() => {
    const handleWindowResize = () => {
      setIsMobile(isMobileWidth());
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <header className="fixed top-0 z-20 w-full bg-lime9">
      <div className="container-width mx-auto flex items-center justify-between py-2">
        <h1 className="text-lg font-medium">Human Benchmark</h1>

        {isMobile ? (
          <Dropdown />
        ) : (
          <div className="flex gap-6">
            <Button
              variant="link"
              className="px-0"
              onClick={() => router.push("/login")}
            >
              Entrar
            </Button>
            <Button
              variant="link"
              className="px-0"
              onClick={() => router.push("/register")}
            >
              Registrar
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};
