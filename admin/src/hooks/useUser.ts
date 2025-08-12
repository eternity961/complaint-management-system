import { useUserStore } from "../store/usersStore";
import axios from "axios";

const useUser = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/user/current-user`,
      {
        withCredentials: true,
      }
    );

    if (response.data.success) {
      const user = response.data.user;
      useUserStore.getState().setUser(user);
      return user;
    } else {
      console.error("Failed to fetch user data.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

export default useUser;
