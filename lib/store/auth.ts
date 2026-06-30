import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  city: string;
  age: number;
  gender?: string;
  verified: boolean;
  rating: number;
  datesCompleted: number;
  createdAt: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, name: string) => void;
  signup: (data: Partial<User> & { email: string; name: string }) => void;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (email, name) =>
        set({
          isAuthenticated: true,
          user: {
            id: crypto.randomUUID(),
            name,
            email,
            city: "",
            age: 0,
            verified: false,
            rating: 0,
            datesCompleted: 0,
            createdAt: new Date().toISOString(),
          },
        }),
      signup: (data) =>
        set({
          isAuthenticated: true,
          user: {
            id: crypto.randomUUID(),
            name: data.name,
            email: data.email,
            phone: data.phone,
            city: data.city || "",
            age: data.age || 0,
            gender: data.gender,
            verified: false,
            rating: 0,
            datesCompleted: 0,
            createdAt: new Date().toISOString(),
          },
        }),
      logout: () => set({ user: null, isAuthenticated: false }),
      updateProfile: (data) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        })),
    }),
    { name: "irlmeet-auth" }
  )
);
