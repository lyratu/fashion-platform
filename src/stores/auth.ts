import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/types/user";

type AuthState = {
  user: User | null;
  token: string | null;
};

type AuthActions = {
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setAuth: (auth: { user: User | null; token: string | null }) => void;
  clearUser: () => void;
};

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setAuth: (auth) => set(auth),
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      clearUser: () => set({ user: null, token: null }),
    }),
    { name: "auth" }
  )
);
