import { Inter } from "next/font/google";
import ArrowGame from "@/components/games/Arrow";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="mt-11 flex justify-center bg-lime3 py-12">
      <ArrowGame />
    </div>
  );
}
