import { Inter } from "next/font/google";
import Header from "@/components/Header";
import ArrowGame from "@/components/Arrow";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Header />
      <ArrowGame />
    </>
  );
}
