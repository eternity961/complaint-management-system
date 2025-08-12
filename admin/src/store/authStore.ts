import { create } from "zustand";
import axios from "axios";

interface AuthState {
  user: { email: string; role: string } | null;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: JSON.parse(localStorage.getItem("user") || "null"),
  error: null,

  login: async (email, password) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        { email, password }
      );

      const user = { email: data.email, role: data.role };
      localStorage.setItem("user", JSON.stringify(user));

      set({ user, error: null });
    } catch (err) {
      set({ error: "Invalid email or password" });
    }
  },

  logout: () => {
    localStorage.removeItem("user");
    set({ user: null, error: null });
  },
}));

export default useAuthStore;
