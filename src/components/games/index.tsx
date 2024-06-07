import { IconBaseProps } from "react-icons";
import { AimGame } from "./AimGame";
import { ArrowGame } from "./ArrowGame";
import { ReactionGame } from "./ReactionGame";

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
  title: string;
}

const gamesData: GameData = {
  arrow: {
    gameComponent: <ArrowGame />,
    icon: <GiBottomRight3DArrow />,
    name: "Teste de Direção",
    instructions:
      "Use as setas do teclado que correspondem com a seta que aparece na tela.",
  },
  aim: {
    gameComponent: <AimGame />,
    icon: <GiArcheryTarget />,
    name: "Teste de Precisão",
    instructions:
      "Use o mouse para acertar 20 alvos na tela o mais rápido possível.",
  },
  reaction: {
    gameComponent: <ReactionGame />,
    icon: <GiLightningTear />,
    name: "Teste de Reação",
    instructions:
      "Use o mouse para clicar na tela quando a palavra 'CLICK' aparecer.",
  },
};

const gamesInfo: GamesInfo[] = [
  {
    icon: <GiBottomRight3DArrow />,
    name: "arrow",
    description: "Você é bom nas setinhas?",
    title: "Teste de Direção",
  },
  {
    icon: <GiArcheryTarget />,
    name: "aim",
    description: "Hora de colocar a mira em dia!",
    title: "Teste de Precisão",
  },
  {
    icon: <GiLightningTear />,
    name: "reaction",
    description: "Seus reflexos estão em dia?",
    title: "Teste de Reação",
  },
];

export { gamesData, gamesInfo };
