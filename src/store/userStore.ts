import { IUserProfile } from "@/interfaces/user.interface";
import api from "@/services/axios";
import { parseCookies } from "nookies";
import { create } from "zustand";

interface useUserStoreProps {
  user: IUserProfile | null;
  setUser: (value: IUserProfile | null) => void;
  loadingData: boolean;
  setLoadingData: (value: boolean) => void;
  destroyUser: () => void;
  fetch: () => Promise<void>;
}

const useUserStore = create<useUserStoreProps>((set) => ({
  user: null,
  setUser: (value) => set(() => ({ user: value })),
  loadingData: false,
  setLoadingData: (value) => set(() => ({ loadingData: value })),
  destroyUser: () => set(() => ({ user: null })),
  fetch: async () => {
    const cookies = parseCookies();
    const token = cookies["h-benchmark"];

    try {
      set({ loadingData: true });
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      const response = await api.get("/users/profile");
      set({ user: response.data });
    } catch (error) {
      console.error(error);
    } finally {
      set({ loadingData: false });
    }
  },
}));

export { useUserStore };
