import { User } from "@/types";
import { create } from "zustand";

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  authenticate: (userData: User) => void;
  logout: () => void;
}

const user =
  (typeof window !== "undefined" &&
    JSON.parse(localStorage.getItem("user")!)) ||
  null;

export const useAuthStore = create<AuthStore>((set) => ({
  user,
  isAuthenticated: !!user,

  authenticate: (userData: User) =>
    set(() => {
      localStorage.setItem("user", JSON.stringify(userData));
      return { user: userData, isAuthenticated: true };
    }),

  logout: () =>
    set(() => {
      localStorage.removeItem("user");
      return { user: null, isAuthenticated: false };
    }),
}));
