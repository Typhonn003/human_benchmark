import { IconBaseProps } from "react-icons";
import Aim from "./Aim";
import ArrowGame from "./Arrow";
import ReactionGame from "./Reaction";

import {
  GiArcheryTarget,
  GiBottomRight3DArrow,
  GiLightningTear,
} from "react-icons/gi";

export interface GameData {
  [key: string]: {
    gameComponent: React.ReactElement;
    icon: React.ReactElement<IconBaseProps>;
    name: string;
    instructions: string;
  };
}

interface GamesInfo {
  icon: React.ReactElement<IconBaseProps>;
  name: string;
  description: string;
}

export const gamesData: GameData = {
  arrow: {
    gameComponent: <ArrowGame />,
    icon: <GiBottomRight3DArrow />,
    name: "Teste de Direção",
    instructions:
      "Use as setas do teclado que correspondem com a seta que aparece na tela.",
  },
  aim: {
    gameComponent: <Aim />,
    icon: <GiArcheryTarget />,
    name: "Teste de Precisão",
    instructions:
      "Use o mouse para acertar 30 alvos na tela o mais rápido possível.",
  },
  reaction: {
    gameComponent: <ReactionGame />,
    icon: <GiLightningTear />,
    name: "Teste de Reação",
    instructions:
      "Use o mouse para clicar na tela quando a palavra 'CLICK' aparecer.",
  },
};

export const gamesInfo: GamesInfo[] = [
  {
    icon: <GiBottomRight3DArrow />,
    name: "Teste de Direção",
    description: "Você é bom nas setinhas?",
  },
  {
    icon: <GiArcheryTarget />,
    name: "Teste de Precisão",
    description: "Hora de colocar a mira em dia!",
  },
  {
    icon: <GiLightningTear />,
    name: "Teste de Reação",
    description: "Seus reflexos estão em dia?",
  },
];
