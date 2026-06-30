import { create } from "zustand";

interface UIState {
  theme: "light" | "dark";
  city: string;
  setTheme: (theme: "light" | "dark") => void;
  setCity: (city: string) => void;
}

export const useUIStore = create<UIState>()((set) => ({
  theme: "light",
  city: "Mumbai",
  setTheme: (theme) => set({ theme }),
  setCity: (city) => set({ city }),
}));
