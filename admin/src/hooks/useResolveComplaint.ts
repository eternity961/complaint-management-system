import axios from "axios";
import { toast } from "react-toastify";

const useResolveComplaint = async (id: string, status: string) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/complaints/${id}/resolve`,
      { status },
      {
        withCredentials: true,
      }
    );

    toast.success("Complaint resolved successfully!");
    return response.data;
  } catch (error: any) {
    console.error("Error resolving complaint:", error);
    toast.error(
      error?.response?.data?.message || "Failed to resolve the complaint"
    );
    return null;
  }
};

export default useResolveComplaint;
