import { IUserProfile } from "@/interfaces/user.interface";
import { create } from "zustand";

interface useUserStoreProps {
  user: IUserProfile | null;
  setUser: (value: IUserProfile | null) => void;
  loadingData: boolean;
  setLoadingData: (value: boolean) => void;
}

const useUserStore = create<useUserStoreProps>((set) => ({
  user: null,
  setUser: (value) => set(() => ({ user: value })),
  loadingData: false,
  setLoadingData: (value) => set(() => ({ loadingData: value })),
}));

export { useUserStore };
