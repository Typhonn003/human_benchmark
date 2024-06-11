import { useGameStatusStore, useUserStore } from "@/store";
import { useRef, useEffect } from "react";

interface Iposition {
  x: number;
  y: number;
}

class Circle {
  position: Iposition;
  radius: number;
  ctx: CanvasRenderingContext2D;
  image: HTMLImageElement;
  old: number;
  now: number;
  score: number;
  maxScore: number;

  constructor(
    x: number,
    y: number,
    radius: number,
    ctx: CanvasRenderingContext2D,
  ) {
    this.position = { x: x, y: y };
    this.radius = radius;
    this.ctx = ctx;
    this.image = new Image(radius * 2, radius * 2);
    this.old = 0;
    this.now = 0;
    this.score = 0;
    this.maxScore = 20;
  }

  draw() {
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = "red";

    this.ctx.beginPath();
    this.ctx.arc(
      this.position.x,
      this.position.y,
      this.radius,
      0,
      2 * Math.PI,
      false,
    );
    this.ctx.stroke();
    this.ctx.closePath();

    // Desenhar a linha horizontal
    this.ctx.beginPath();
    this.ctx.moveTo(this.position.x - this.radius, this.position.y);
    this.ctx.lineTo(this.position.x + this.radius, this.position.y);
    this.ctx.stroke();
    this.ctx.closePath();

    // Desenhar a linha vertical
    this.ctx.beginPath();
    this.ctx.moveTo(this.position.x, this.position.y - this.radius);
    this.ctx.lineTo(this.position.x, this.position.y + this.radius);
    this.ctx.stroke();
    this.ctx.closePath();
  }

  move() {
    this.position.x =
      Math.random() * (this.ctx.canvas.width - 2 * this.radius) + this.radius;
    this.position.y =
      Math.random() * (this.ctx.canvas.height - 2 * this.radius) + this.radius;
  }

  isInside(clickX: number, clickY: number) {
    const distance = Math.sqrt(
      Math.pow(this.position.x - clickX, 2) +
        Math.pow(this.position.y - clickY, 2),
    );

    if (distance <= this.radius) {
      return true;
    } else {
      return false;
    }
  }

  drawTime(ctx: CanvasRenderingContext2D) {
    this.now = Date.now();
    ctx.fillStyle = "#37401C";
    ctx.font = "24px serif";
    const textContent = `Tempo: ${((this.now - this.old) / 1000).toFixed(1)}`;
    const textSize = Math.floor(
      ctx.measureText(textContent).actualBoundingBoxDescent,
    );
    ctx.fillText(textContent, 10, ctx.canvas.height - textSize - 10);
  }

  drawScore(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    ctx.fillStyle = "#37401C";
    ctx.font = "36px serif";
    const textContent = `${this.score}`;
    const textSize = Math.floor(ctx.measureText(textContent).width);
    ctx.fillText(textContent, canvas.width - textSize - 10, 52);
  }

  update(srcAim: string) {
    this.image.src = srcAim;
  }

  reset() {
    this.old = 0;
    this.now = 0;
    this.score = 0;
  }

  initMessage() {}
}

const AimGame = () => {
  const { setGameFinished, setGameScore, setFinalScreen } =
    useGameStatusStore();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const circle = useRef<Circle | null>(null);

  const cleanScreen = (context: CanvasRenderingContext2D) => {
    context.fillStyle = "#bdee63";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  };

  const animate = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        cleanScreen(context);

        if (!circle.current) {
          circle.current = new Circle(50, 50, 20, context);
          //circle.current.update("/shot.png");
        }

        circle.current.draw();
        if (circle.current.old) {
          circle.current.drawTime(context);
          circle.current.drawScore(context, canvas);
        }
      }
      requestAnimationFrame(animate);
    }
  };

  const handleCanvasClick: EventListener = (e) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context && circle.current) {
        if (
          circle.current.isInside(
            (e as MouseEvent).offsetX,
            (e as MouseEvent).offsetY,
          )
        ) {
          if (!circle.current.old) {
            circle.current.old = Date.now();
          }
          circle.current.move();
          if (circle.current.score == circle.current.maxScore - 1) {
            const finalScore = parseFloat(
              ((circle.current.now - circle.current.old) / 1000).toFixed(2),
            );
            setGameScore(finalScore);
            setGameFinished(true);
            setFinalScreen(true);
          }
          circle.current.score += 1;
          const AudioClass =
            typeof window !== "undefined" ? window.Audio : null;

          let scoreSound = AudioClass ? new AudioClass("/arrow.wav") : null;
          scoreSound?.addEventListener("ended", () => {
            scoreSound = null;
          });
          if (scoreSound) {
            scoreSound.play();
          }
        }
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      canvas.width = 500;
      canvas.height = 500;
      animate();

      canvas.addEventListener("click", handleCanvasClick);
    }

    return () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.removeEventListener("click", handleCanvasClick);
      }
    };
  }, []);

  return (
    <canvas ref={canvasRef} width={500} height={500} className="rounded-md" />
  );
};

export { AimGame };
