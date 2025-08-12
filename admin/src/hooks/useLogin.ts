import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export const useLogin = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);

  const login = async (userName: string, password: string) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/admin-login`,
        { userName, password },
        { withCredentials: true }
      );

      const { role } = response.data;

      localStorage.setItem("userRole", role);
      localStorage.setItem("userName", userName);

      toast.success("Login successful!");

      if (role === "General Manager") {
        navigate("/gm-dashboard");
      } else if (role === "Distribution Supervisor") {
        navigate("/ds-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err: any) {
      setLoading(false);
      setError(err.response?.data?.message || "Invalid credentials");
      toast.error(err.response?.data?.message || "Invalid email or password");
    }
  };

  return { login, error, isLoading };
};
