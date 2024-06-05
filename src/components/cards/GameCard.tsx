import { ReactNode } from "react";
import { useRouter } from 'next/router'

interface GameCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  name: string;
}

const GameCard = ({ icon, title, description, name }: GameCardProps) => {
  const router = useRouter()

  return (
    <li 
      className="card-animation group flex h-44 w-full items-center justify-evenly rounded-md border border-lime6 bg-gradient-to-b from-lime3 to-lime5 shadow-md hover:border-lime8"
      onClick={() => router.push(`/game/${name}`)}>
      <div className="text-8xl group-hover:text-lime11">{icon}</div>
      <div className="flex w-3/5 flex-col">
        <div>
          <h2 className="text-center text-2xl font-medium">{title}</h2>
          <p className="text-center text-lime11">{description}</p>
        </div>
      </div>
    </li>
  );
};

export { GameCard };
