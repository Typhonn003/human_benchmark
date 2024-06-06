import { create } from "zustand";

interface useGameStatusStoreProps {
  gameId: string | null;
  setGameId: (value: string | null) => void;
  gameStart: boolean;
  setGameStart: (value: boolean) => void;
  gameFinished: boolean;
  setGameFinished: (value: boolean) => void;
  gameScore: number;
  setGameScore: (value: number) => void;
  finalScreen: boolean;
  setFinalScreen: (value: boolean) => void;
}

const useGameStatusStore = create<useGameStatusStoreProps>((set) => ({
  gameId: null,
  setGameId: (value) => set(() => ({ gameId: value })),
  gameStart: false,
  setGameStart: (value) => set(() => ({ gameStart: value })),
  gameFinished: false,
  setGameFinished: (value) => set(() => ({ gameFinished: value })),
  gameScore: 0,
  setGameScore: (value) => set(() => ({ gameScore: value })),
  finalScreen: false,
  setFinalScreen: (value) => set(() => ({ finalScreen: value })),
}));

export { useGameStatusStore };
