import { create } from "zustand";

interface useGameStatusStoreProps {
  gameStart: boolean;
  setGameStart: (value: boolean) => void;
  gameId: string | null;
  setGameId: (value: string | null) => void;
}

const useGameStatusStore = create<useGameStatusStoreProps>((set) => ({
  gameStart: false,
  setGameStart: (value) => set(() => ({ gameStart: value })),
  gameId: null,
  setGameId: (value) => set(() => ({ gameId: value })),
}));

export { useGameStatusStore };
