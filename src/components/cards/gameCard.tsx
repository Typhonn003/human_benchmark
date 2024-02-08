import { ReactNode } from "react";

interface GameCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export const GameCard = ({ icon, title, description }: GameCardProps) => {
  return (
    <div className="group flex h-44 w-full items-center justify-evenly rounded-md border border-lime6 bg-gradient-to-b from-lime3 to-lime5 shadow-md hover:border-lime8 transition transform hover:-translate-y-2 motion-reduce:transition-none motion-reduce:hover:transform-none">
      <div className="text-8xl group-hover:text-lime11">{icon}</div>
      <div className="smartphone:w-3/6 flex w-3/5 flex-col">
        <div>
          <h2 className="text-center text-2xl font-medium">{title}</h2>
          <p className="text-center text-lime11">{description}</p>
        </div>
      </div>
    </div>
  );
};
