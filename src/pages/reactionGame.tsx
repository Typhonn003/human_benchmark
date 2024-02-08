import { Inter } from "next/font/google";
import Header from "@/components/Header";
import ReactionGame from "@/components/Reaction";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <ReactionGame />
    </>
  );
}
