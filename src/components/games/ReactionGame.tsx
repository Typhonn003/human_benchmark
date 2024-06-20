import { useEffect, useRef } from "react";
import { useGameStatusStore } from "@/store";

class ReactionClass {
  state: string;
  time: number;
  lastTime: number;
  timeId: NodeJS.Timeout | null;
  ctx: CanvasRenderingContext2D;
  scores: number[];
  playTime: number;
  constructor(ctx: CanvasRenderingContext2D) {
    this.state = "waiting"; // não começa mais no "init" pois tem o botão de iniciar fora do jogo
    this.time = 0;
    this.lastTime = 0;
    this.timeId = null;
    this.ctx = ctx;
    this.scores = [];
    this.playTime = 0;
  }

  fillScreen(color = "blue") {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  writeOnScreen(text: string, size: number = 24, color: string = "#37401C") {
    this.ctx.fillStyle = color;
    this.ctx.font = `${size}px serif`;
    const textSize = Math.floor(this.ctx.measureText(text).width);
    this.ctx.fillText(
      text,
      (this.ctx.canvas.width - textSize) / 2,
      this.ctx.canvas.height / 2,
    );
  }

  writeStage(color: string = "black", size: number) {
    this.ctx.fillStyle = color;
    this.ctx.font = `${size}px Arial`;
    const text = `${this.playTime}/3`;
    const textSize = Math.floor(this.ctx.measureText(text).width);
    this.ctx.fillText(text, this.ctx.canvas.width - textSize - 10, size + 10);
  }

  writeNotFinal(color: string = "#37401C", size: number = 18) {
    this.ctx.fillStyle = color;
    this.ctx.font = `${size}px serif`;
    const text = `Click para continuar`;
    const textSize = Math.floor(this.ctx.measureText(text).width);
    this.ctx.fillText(
      text,
      (this.ctx.canvas.width - textSize) / 2,
      this.ctx.canvas.height * 0.75,
    );
  }

  writeFinal(
    setGameFinished: (value: boolean) => void,
    setGameScore: (value: number) => void,
    setFinalScreen: (value: boolean) => void,
  ) {
    setFinalScreen(true);
    setGameFinished(true);
    const total =
      this.scores.reduce(function (accumulator, value) {
        return accumulator + value;
      }, 0) / this.scores.length;
    setGameScore(parseFloat(total.toFixed(3)));
  }

  click() {
    switch (this.state) {
      case "waiting":
        clearTimeout(this.timeId!);
        this.timeId = null;
        this.state = "wrong";
        break;
      case "click":
        if (this.playTime <= 3) {
          this.scores.push((this.lastTime - this.time) / 1000);
          this.playTime += 1;
          this.state = "correct";
        }
        break;

      case "correct":
        this.time = 0;
        this.lastTime = 0;
        this.timeId = null;
        if (this.playTime >= 3) {
          this.state = "final";
        } else {
          this.state = "waiting";
        }
        break;

      default:
        this.time = 0;
        this.lastTime = 0;
        this.timeId = null;
        this.state = "waiting";
        break;
    }
  }

  waitingTime() {
    const randomTime = Math.random() * 5000 + 2000;
    this.timeId = setTimeout(() => {
      this.state = "click";
    }, randomTime);
  }
}

const ReactionGame = () => {
  const { setGameFinished, setFinalScreen, setGameScore } =
    useGameStatusStore();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const reactionRef = useRef<ReactionClass | null>(null);

  useEffect(() => {
    let animationFrameId: number = 0;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reaction = new ReactionClass(ctx);
    reactionRef.current = reaction;
    ctxRef.current = ctx;

    const handleClick = () => {
      if (reactionRef.current) {
        reactionRef.current.click();
      }
    };

    const animate = () => {
      clearScreen();
      if (reactionRef.current && ctxRef.current) {
        switch (reactionRef.current.state) {
          case "waiting":
            reactionRef.current.fillScreen("#0090FF");
            reactionRef.current.writeOnScreen(
              "Aguarde a cor mudar",
              undefined,
              "white",
            );
            reactionRef.current.writeStage("black", 40);
            if (reactionRef.current.timeId === null) {
              reactionRef.current.waitingTime();
            }
            break;
          case "click":
            reactionRef.current.fillScreen("#30A46C");
            reactionRef.current.writeOnScreen("Click!", undefined, "white");
            reactionRef.current.writeStage("black", 40);
            if (reactionRef.current.time === 0) {
              reactionRef.current.time = Date.now();
            }
            reactionRef.current.lastTime = Date.now();
            break;
          case "wrong":
            reactionRef.current.fillScreen("#E5484D");
            reactionRef.current.writeOnScreen(
              "Muito cedo, click para reiniciar.",
              undefined,
              "white",
            );
            reactionRef.current.writeStage("black", 40);
            break;
          case "correct":
            const deltaTime =
              (reactionRef.current.lastTime - reactionRef.current.time) / 1000;
            reactionRef.current.writeOnScreen(`Seu tempo foi de ${deltaTime}s`);
            reactionRef.current.writeStage("black", 40);
            if (reactionRef.current.playTime == 3) {
              reactionRef.current.writeFinal(
                setGameFinished,
                setGameScore,
                setFinalScreen,
              );
            } else {
              reactionRef.current.writeNotFinal();
            }
            break;
          case "final":
            console.log("final");
            break;
          default:
            break;
        }
        if (reactionRef.current.state != "final") {
          animationFrameId = requestAnimationFrame(animate);
        }
      }
    };

    const clearScreen = () => {
      if (ctxRef.current) {
        ctxRef.current.fillStyle = "#bdee63";
        ctxRef.current.fillRect(0, 0, canvas.width, canvas.height);
      }
    };

    canvas.addEventListener("click", handleClick);
    animate();

    return () => {
      canvas.removeEventListener("click", handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas ref={canvasRef} width={500} height={500} className="rounded-md" />
  );
};

export { ReactionGame };
