import { create } from "zustand";

interface useGameStatusStoreProps {
  gameStart: boolean;
  setGameStart: (value: boolean) => void;
}

const useGameStatusStore = create<useGameStatusStoreProps>((set) => ({
  gameStart: false,
  setGameStart: (value) => set(() => ({ gameStart: value })),
}));

export { useGameStatusStore };
