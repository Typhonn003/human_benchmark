import { ReactNode } from "react";

interface InfoCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export const InfoCard = ({ icon, title, description }: InfoCardProps) => {
  return (
    <div className="flex w-full items-center justify-between gap-4">
      <div className="flex min-h-24 min-w-24 items-center justify-center rounded-md bg-lime9 text-6xl">
        {icon}
      </div>
      <div>
        <h2 className="text-xl font-medium">{title}</h2>
        <p className="text-justify text-base text-lime11">{description}</p>
      </div>
    </div>
  );
};
