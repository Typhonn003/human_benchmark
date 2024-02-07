import { ReactNode } from "react";

interface GameCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export const GameCard = ({ icon, title, description }: GameCardProps) => {
  return (
    <div className="xl:w-h-72 flex h-44 w-full items-center justify-evenly rounded-md border border-lime6 bg-gradient-to-b from-lime3 to-lime5 xl:h-72 xl:flex-col">
      <div className="text-8xl">{icon}</div>
      <div className="flex w-3/5 flex-col">
        <div>
          <h2 className="text-center text-2xl font-medium">{title}</h2>
          <p className="text-center text-lime11">{description}</p>
        </div>
      </div>
    </div>
  );
};
