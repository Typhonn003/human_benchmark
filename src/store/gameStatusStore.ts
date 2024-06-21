import { create } from "zustand";

interface useGameStatusStoreProps {
  gameStart: boolean;
  setGameStart: (value: boolean) => void;
  gameFinished: boolean;
  setGameFinished: (value: boolean) => void;
  gameScore: number;
  setGameScore: (value: number) => void;
  finalScreen: boolean;
  setFinalScreen: (value: boolean) => void;
  restartGameStats: () => void;
}

const useGameStatusStore = create<useGameStatusStoreProps>((set) => ({
  gameStart: false,
  setGameStart: (value) => set(() => ({ gameStart: value })),
  gameFinished: false,
  setGameFinished: (value) => set(() => ({ gameFinished: value })),
  gameScore: 0,
  setGameScore: (value) => set(() => ({ gameScore: value })),
  finalScreen: false,
  setFinalScreen: (value) => set(() => ({ finalScreen: value })),
  restartGameStats: () => {
    set({ gameStart: false });
    set({ gameFinished: false });
    set({ finalScreen: false });
    set({ gameScore: 0 });
  },
}));

export { useGameStatusStore };
