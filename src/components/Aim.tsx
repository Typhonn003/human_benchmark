import React, { useRef, useEffect } from "react";

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
    ctx: CanvasRenderingContext2D
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
        Math.pow(this.position.y - clickY, 2)
    );

    if (distance <= this.radius) {
      return true;
    } else {
      return false;
    }
  }
}

export default function Aim() {
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
          // Criar a instância da classe Circle se ainda não existir
          circle.current = new Circle(50, 50, 20, context);
        }

        // Chamar a função draw da instância da classe Circle
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
        // Chamar a função isInside da instância da classe Circle
        if (
          circle.current.isInside(
            (e as MouseEvent).clientX,
            (e as MouseEvent).clientY
          )
        ) {
          // Se a condição for verdadeira, mova o círculo
          circle.current.move();
        }
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      animate();

      // Adicionar o event listener para o clique no canvas
      canvas.addEventListener("click", handleCanvasClick);
    }

    return () => {
      const canvas = canvasRef.current;
      if (canvas) {
        // Remover o event listener ao desmontar o componente
        canvas.removeEventListener("click", handleCanvasClick);
      }
    };
  }, []);

  return <canvas ref={canvasRef} />;
}

/*
export default function Aim() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const player = { x: 50, y: 50 }

  const cleanScreen = (context: CanvasRenderingContext2D) => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  };

  const drawMap = (context: CanvasRenderingContext2D) => {
    const size = 50;
    const map = [[1, 1, 1], [1, 0, 1], [1, 1, 1]];

    for (let i = 0; i < map.length; i++) {
      const row = map[i];
      for (let j = 0; j < row.length; j++) {
        const element = row[j];
        if (element) {
          context.fillStyle = 'white';
        } else {
          context.fillStyle = 'red';
        }
        context.fillRect(j * size, i * size, size, size);
      }
    }
  };

  const drawPlayer = (context: CanvasRenderingContext2D) => {
    context.fillStyle = 'green';
    context.fillRect(player.x, player.y, 20, 20);
  }

  const animate = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        cleanScreen(context);
        // drawMap(context);
        drawPlayer(context);
      }
      requestAnimationFrame(animate);
    }
  };

  const keyHandler = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowUp':
        player.y -= 5;
        break;
      case 'ArrowDown':
        player.y += 5;
        break;
      case 'ArrowLeft':
        player.x -= 5;
        break;
      case 'ArrowRight':
        player.x += 5;
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const context = canvas.getContext('2d');
      if (context) {
        animate();
        window.addEventListener('keydown', keyHandler);
      }
    }

    return () => {
      window.removeEventListener('keydown', keyHandler);
    };
  }, []);

  return <canvas ref={canvasRef} />;
}

*/
