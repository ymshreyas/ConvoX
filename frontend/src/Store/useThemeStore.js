import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("convox-theme") || "forest",
  setTheme: (theme) => {
    localStorage.setItem("convox-theme", theme);
    set({ theme });
  },
}));