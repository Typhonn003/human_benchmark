import { useEffect, useRef } from 'react';

export default function ReactionGame()  {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const reactionRef = useRef<ReactionClass | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
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
          case 'init':
            reactionRef.current.writeOnScreen('Click na tela para iniciar');
            break;
          case 'waiting':
            reactionRef.current.fillScreen('blue');
            reactionRef.current.writeOnScreen('Assim que a cor mudar, de um click', undefined, "white");
            if (reactionRef.current.timeId === null) {
              reactionRef.current.waitingTime();
            }
            break;
          case 'click':
            reactionRef.current.fillScreen('green');
            reactionRef.current.writeOnScreen('Click agora!', undefined, "white");
            if (reactionRef.current.time === 0) {
              reactionRef.current.time = Date.now();
            }
            reactionRef.current.lastTime = Date.now();
            break;
          case 'wrong':
            reactionRef.current.fillScreen('red');
            reactionRef.current.writeOnScreen('Calma, click para reiniciar.');
            break;
          case 'correct':
            const deltaTime = (reactionRef.current.lastTime - reactionRef.current.time) / 1000;
            reactionRef.current.writeOnScreen(`Parabéns, seu tempo foi de ${deltaTime}s`);
            break;
          default:
            break;
        }
        requestAnimationFrame(animate);
      }
    };

    const clearScreen = () => {
      if (ctxRef.current) {
        ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    canvas.addEventListener('click', handleClick);
    animate();

    return () => {
      canvas.removeEventListener('click', handleClick);
    };
  }, []);

  return <canvas ref={canvasRef} width={500} height={500} />;
};

class ReactionClass {
  state: string;
  time: number;
  lastTime: number;
  timeId: NodeJS.Timeout | null;
  ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D) {
    this.state = 'init';
    this.time = 0;
    this.lastTime = 0;
    this.timeId = null;
    this.ctx = ctx;
  }

  fillScreen(color = 'blue') {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  writeOnScreen(text: string, size:number = 24, color: string = "black") {
    this.ctx.fillStyle = color;
    this.ctx.font = `${size}px serif`;
    const textSize = Math.floor(this.ctx.measureText(text).width);
    this.ctx.fillText(text, (this.ctx.canvas.width - textSize) / 2, this.ctx.canvas.height / 2);
  }

  click() {
    switch (this.state) {
      case 'waiting':
        clearTimeout(this.timeId!);
        this.timeId = null;
        this.state = 'wrong';
        break;
      case 'click':
        this.state = 'correct';
        break;
      default:
        this.time = 0;
        this.lastTime = 0;
        this.timeId = null;
        this.state = 'waiting';
        break;
    }
  }

  waitingTime() {
    const randomTime = Math.random() * 5000 + 2000;
    this.timeId = setTimeout(() => {
      this.state = 'click';
    }, randomTime);
  }
}

