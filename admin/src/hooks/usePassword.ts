import changePasswordSchema, {
  changePasswordData,
} from "@/utils/changePasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const usePassword = () => {
  const [isLoading, setLoading] = useState(false);

  const form = useForm<changePasswordData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: changePasswordData) => {
    setLoading(true);
    let isComponentMounted = true;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/change-password`,
        data,
        { withCredentials: true }
      );

      const result = response.data;

      if (isComponentMounted) {
        if (result.success) {
          toast.success("Password changed successfully!");
          form.reset();
        } else {
          toast.error(result.message || "Something went wrong.");
        }
      }
    } catch (error: any) {
      console.error(error);
      if (isComponentMounted) {
        toast.error(
          error.response?.data?.message || "Failed to update. Please try again."
        );
      }
    } finally {
      if (isComponentMounted) setLoading(false);
    }

    return () => {
      isComponentMounted = false;
    };
  };

  return { isLoading, form, onSubmit };
};

export default usePassword;
