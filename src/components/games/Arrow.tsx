import { useRef, useEffect, useState } from "react";

class Arrow {
  size: number;
  up: HTMLImageElement;
  left: HTMLImageElement;
  right: HTMLImageElement;
  down: HTMLImageElement;
  heart: HTMLImageElement;
  score: number;
  options: string[];
  actual: string | null;
  drawSize: number;
  time: number;
  life: number;
  now: number;
  win: boolean;
  lastScore: number;
  gameTime: number;

  constructor(size: number) {
    this.size = size;
    this.up = new Image(size, size);
    this.left = new Image(size, size);
    this.right = new Image(size, size);
    this.down = new Image(size, size);
    this.heart = new Image(size, size);
    this.score = 0;
    this.options = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
    this.actual = null;
    this.drawSize = size;
    this.time = 0;
    this.life = 3;
    this.now = 0;
    this.win = false;
    this.lastScore = 0;
    this.gameTime = 5; //no final colocar 30s
  }

  update(
    srcUp: string,
    srcDown: string,
    srcLeft: string,
    srcRight: string,
    srcHeart: string,
  ) {
    this.up.src = srcUp;
    this.down.src = srcDown;
    this.left.src = srcLeft;
    this.right.src = srcRight;
    this.heart.src = srcHeart;
  }

  newActual() {
    let filtered = this.options.filter((element) => {
      return element != this.actual;
    });
    this.actual = filtered[Math.floor(Math.random() * filtered.length)];
  }

  draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    switch (this.actual) {
      case "ArrowUp":
        ctx.drawImage(
          this.up,
          canvas.width / 2 - this.drawSize / 2,
          canvas.height / 2 - this.drawSize / 2,
          this.drawSize,
          this.drawSize,
        );
        break;
      case "ArrowDown":
        ctx.drawImage(
          this.down,
          canvas.width / 2 - this.drawSize / 2,
          canvas.height / 2 - this.drawSize / 2,
          this.drawSize,
          this.drawSize,
        );
        break;
      case "ArrowLeft":
        ctx.drawImage(
          this.left,
          canvas.width / 2 - this.drawSize / 2,
          canvas.height / 2 - this.drawSize / 2,
          this.drawSize,
          this.drawSize,
        );
        break;
      case "ArrowRight":
        ctx.drawImage(
          this.right,
          canvas.width / 2 - this.drawSize / 2,
          canvas.height / 2 - this.drawSize / 2,
          this.drawSize,
          this.drawSize,
        );
        break;
      default:
        break;
    }
  }

  isCorrect(str: string) {
    console.log(str);
    if (str == this.actual) {
      this.win = false;
      this.newActual();
      this.score++;
      this.playSoundEffect("./sound.wav");
      if (!this.time) {
        this.time = Date.now();
      }
    } else if (this.time == 0) {
      return;
    } else {
      this.life--;
      this.playHurtEffect("./hurt.mp3");
      if (this.life == 0) {
        this.gameOver();
      }
    }
  }

  gameOver() {
    this.score = 0;
    this.time = 0;
    this.life = 3;
    this.newActual();
  }

  drawScore(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    ctx.fillStyle = "#37401C";
    ctx.font = "56px serif";
    const textContent = `${this.score}`;
    const textSize = Math.floor(ctx.measureText(textContent).width);
    ctx.fillText(textContent, canvas.width - textSize - 10, 52);
  }

  drawTime(ctx: CanvasRenderingContext2D) {
    this.now = Date.now();
    ctx.fillStyle = "#37401C";
    ctx.font = "46px serif";
    const textContent = `Tempo: ${(this.gameTime - (this.now - this.time) / 1000).toFixed(1)}`;
    const textSize = Math.floor(
      ctx.measureText(textContent).actualBoundingBoxDescent,
    );
    ctx.fillText(textContent, 10, ctx.canvas.height - textSize - 10);
  }

  drawLifes(ctx: CanvasRenderingContext2D) {
    for (let i = 0; i < this.life; i++) {
      ctx.drawImage(this.heart, 10 + i * 61, 10, 56, 46);
    }
  }

  finishGame() {
    const deltaTime = (this.now - this.time) / 1000;
    if (deltaTime >= this.gameTime) {
      this.win = true;
      this.lastScore = this.score;
      this.gameOver();
    }
    return;
  }

  drawWin(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    ctx.fillStyle = "#37401C";
    ctx.font = "20px serif";

    let textContent = `Sua pontuação de ${this.lastScore} foi enviada!`;
    let textSize = Math.floor(ctx.measureText(textContent).width);

    ctx.fillText(
      textContent,
      (canvas.width - textSize) / 2,
      canvas.height - 80,
    );

    ctx.font = "12px serif";
    textContent = "Aperte a seta correspondente para jogar novamente :D";
    textSize = Math.floor(ctx.measureText(textContent).width);

    ctx.fillText(
      textContent,
      (canvas.width - textSize) / 2,
      canvas.height - 40,
    );
  }

  playSoundEffect(src: string) {
    let audio: HTMLAudioElement | null = new Audio(src);
    audio.addEventListener("ended", () => {
      audio = null;
    });
    audio.addEventListener("loadedmetadata", () => {
      audio?.play();
    });
  }

  playHurtEffect(src: string) {
    let audio: HTMLAudioElement | null = new Audio(src);
    audio.addEventListener("ended", () => {
      audio = null;
    });
    audio.addEventListener("loadedmetadata", () => {
      audio?.play();
    });
  }
}

export default function ArrowGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [arrow, setArrow] = useState<Arrow | null>(null);
  const cleanScreen = (context: CanvasRenderingContext2D) => {
    context.fillStyle = "#bdee63";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    //context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const arrow = new Arrow(120);
        arrow.update(
          "./up.png",
          "./down.png",
          "./left.png",
          "./right.png",
          "./heart.png",
        );
        arrow.newActual();
        setArrow(arrow);

        const handleKeyPress = (e: KeyboardEvent) => {
          arrow?.isCorrect(e.key);
        };

        window.addEventListener("keydown", handleKeyPress);

        const animate = () => {
          if (canvas) {
            const ctx = canvas.getContext("2d");
            if (ctx && arrow) {
              cleanScreen(ctx);
              arrow.draw(ctx, canvas);
              arrow.drawScore(ctx, canvas);
              arrow.drawLifes(ctx);
              if (arrow.time) {
                arrow.drawTime(ctx);
                arrow.finishGame();
              }
              if (arrow.win) {
                arrow.drawWin(ctx, canvas);
              }
            }
          }
          requestAnimationFrame(animate);
        };

        animate();

        return () => {
          window.removeEventListener("keydown", handleKeyPress);
        };
      }
    }
  }, []);

  return (
    <canvas ref={canvasRef} width={500} height={500} className="rounded-md" />
  );
}
