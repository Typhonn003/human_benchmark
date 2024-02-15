import { Inter } from "next/font/google";
import ReactionGame from "@/components/games/Reaction";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <ReactionGame />
    </>
  );
}
