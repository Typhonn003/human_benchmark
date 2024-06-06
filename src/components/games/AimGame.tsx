import { useUserStore } from "@/store";
import { useRef, useEffect } from "react";


interface Iposition {
  x: number;
  y: number;
}

class Circle {
  position: Iposition;
  radius: number;
  ctx: CanvasRenderingContext2D;
  constructor(
    x: number,
    y: number,
    radius: number,
    ctx: CanvasRenderingContext2D,
  ) {
    this.position = { x: x, y: y };
    this.radius = radius;
    this.ctx = ctx;
  }

  draw() {
    this.ctx.fillStyle = "red";
    this.ctx.beginPath();
    this.ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    this.ctx.stroke();
    this.ctx.fill();
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
}

const AimGame = () => {
  const { user } = useUserStore();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  let score = 0;
  const circle = useRef<Circle | null>(null);

  const cleanScreen = (context: CanvasRenderingContext2D) => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  };

  const animate = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        cleanScreen(context);

        if (!circle.current) {
          circle.current = new Circle(50, 50, 20, context);
        }

        circle.current.draw();
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
          circle.current.move();
          score += 1;
          const AudioClass =
            typeof window !== "undefined" ? window.Audio : null;

          let scoreSound = AudioClass ? new AudioClass("/sound.wav") : null;
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

  return <canvas className="border-2 border-white" ref={canvasRef} />;
};

export { AimGame };
