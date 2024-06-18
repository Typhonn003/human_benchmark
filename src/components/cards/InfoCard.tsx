import { poppins } from "@/fonts";

interface InfoCardProps {
  name: string;
  icon: JSX.Element;
  maxPoints: number;
  playCount: number;
  averagePoints: number;
}

const InfoCard = ({
  name,
  icon,
  maxPoints,
  playCount,
  averagePoints,
}: InfoCardProps) => {
  const handleName = (name: string) => {
    switch (name) {
      case "aim":
        return "Precisão";
      case "arrow":
        return "Direção";
      case "reaction":
        return "Reação";
    }
  };

  return (
    <li
      className="group flex h-44 w-full cursor-default flex-col items-center justify-evenly rounded-md border border-lime6 bg-gradient-to-b from-lime3 to-lime5 shadow-md hover:border-lime8"
      key={name}
    >
      <div className="flex w-full items-center justify-evenly">
        <div className="text-6xl group-hover:text-lime11">{icon}</div>
        <h2 className={`${poppins.className} text-xl font-medium`}>
          {handleName(name)?.toUpperCase()}
        </h2>
      </div>
      <div className="align-center flex w-full justify-evenly text-center">
        <div className="flex flex-col">
          <p className="font-medium">Recorde</p>
          <span className="group-hover:text-lime11">{maxPoints}</span>
        </div>
        <div className="flex flex-col">
          <p className="font-medium">Já jogado</p>
          <span className="group-hover:text-lime11">
            {playCount} {playCount === 1 ? "vez" : "vezes"}
          </span>
        </div>
        <div className="flex flex-col">
          <p className="font-medium">Média</p>
          <span className="group-hover:text-lime11">
            {averagePoints.toFixed(2)}
          </span>
        </div>
      </div>
    </li>
  );
};

export { InfoCard };
