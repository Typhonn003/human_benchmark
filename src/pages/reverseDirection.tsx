import { useCallback, useEffect, useState } from "react";
import * as Arrow from "react-icons/fa";

interface Direction {
  actual: string;
  key: string;
}

export default function ReverseDirection() {
  const generateRandomDirection = useCallback((key: string | null) => {
    const directions: Direction[] = [
      { actual: "up", key: "ArrowDown" },
      { actual: "down", key: "ArrowUp" },
      { actual: "left", key: "ArrowRight" },
      { actual: "right", key: "ArrowLeft" },
    ];

    if (!key) {
      const randomNumber = Math.floor(Math.random() * 4);
      return directions[randomNumber];
    }

    const filtered = directions.filter((element) => {
      return element.key !== key;
    });

    return filtered[Math.floor(Math.random() * filtered.length)];
  }, []);

  const [start, setStart] = useState<boolean>(false);
  const [actualDirection, setActualDirection] = useState<Direction>(
    generateRandomDirection(null)
  );
  const [lives, setLives] = useState(3);

  const { actual, key } = actualDirection;

  const verityAnswer = useCallback(
    (choise: string) => {
      if (choise === key) {
        setActualDirection(generateRandomDirection(choise));
      } else {
        setLives(lives - 1);
      }
    },
    [generateRandomDirection, key, lives]
  );

  const restart = () => {
    setActualDirection(generateRandomDirection(null));
    setLives(3);
  };

  useEffect(() => {
    const handleKeyDown = ({ key }: KeyboardEvent) => {
      verityAnswer(key);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [verityAnswer]);

  return (
    <main className="w-full min-h-screen bg-green-600 flex justify-center items-center">
      {start ? (
        lives > 0 ? (
          <div>
            <p className="text-4xl">Vidas: {lives}</p>
            <div className="bg-green-500 w-96 h-96 flex flex-col justify-evenly items-center rounded-md">
              <button
                className="text-6xl"
                onClick={() => verityAnswer("ArrowUp")}
              >
                <Arrow.FaArrowAltCircleUp />
              </button>
              <div className="flex items-center justify-evenly w-full">
                <button
                  className="text-6xl"
                  onClick={() => verityAnswer("ArrowLeft")}
                >
                  <Arrow.FaArrowAltCircleLeft />
                </button>
                <p
                  data-actual={actual}
                  className="text-6xl data-[actual='up']:rotate-0 data-[actual='left']:rotate-270 data-[actual='right']:rotate-90 data-[actual='down']:rotate-180"
                >
                  <Arrow.FaArrowAltCircleUp />
                </p>
                <button
                  className="text-6xl"
                  onClick={() => verityAnswer("ArrowRight")}
                >
                  <Arrow.FaArrowAltCircleRight />
                </button>
              </div>
              <button
                className="text-6xl"
                onClick={() => verityAnswer("ArrowDown")}
              >
                <Arrow.FaArrowAltCircleDown />
              </button>
            </div>
          </div>
        ) : (
          <div>
            <button
              className="px-5 py-1 rounded-lg bg-yellow-500 text-white"
              onClick={restart}
            >
              Retry
            </button>
          </div>
        )
      ) : (
        <div>
          <button
            className="px-5 py-1 rounded-lg bg-yellow-500 text-white"
            onClick={() => setStart(true)}
          >
            Começar
          </button>
        </div>
      )}
    </main>
  );
}
