import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  userName: string;
  status: string;
  phoneNumber: string;
  isSuspended: boolean;
}

interface UserStore {
  users: User[];
  loading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  user: User | null;
  setUser: (user: User | null) => void;
  suspendUser: (id: string) => Promise<void>;
  unSuspendUser: (id: string) => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  loading: false,
  error: null,

  fetchUsers: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.get<User[]>(
        `${import.meta.env.VITE_API_URL}/api/users`,
        {
          withCredentials: true,
        }
      );
      set({ users: data });
    } catch (error) {
      set({ error: "Failed to fetch users" });
    } finally {
      set({ loading: false });
    }
  },

  user: null,
  setUser: (user: User | null) => set({ user }),

  deleteUser: async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/user/delete-user/${id}`,
        {
          withCredentials: true,
        }
      );
      set((state) => ({
        users: state.users.filter((user) => user._id !== id),
      }));
      toast.success("User has been deleted successfully.");
    } catch (error) {
      console.error("Failed to delete user", error);
    }
  },

  suspendUser: async (id) => {
    await axios.patch(`${import.meta.env.VITE_API_URL}/api/auth/suspend/${id}`);
    set((state) => ({
      users: state.users.map((user) =>
        user._id === id ? { ...user, isSuspended: true } : user
      ),
    }));
  },

  unSuspendUser: async (id) => {
    await axios.patch(
      `${import.meta.env.VITE_API_URL}/api/auth/unsuspend/${id}`
    );
    set((state) => ({
      users: state.users.map((user) =>
        user._id === id ? { ...user, isSuspended: false } : user
      ),
    }));
  },
}));
