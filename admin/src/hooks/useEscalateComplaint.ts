import axios from "axios";
import { toast } from "react-toastify";

const useEscalateComplaint = async (id: string) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/complaints/${id}/escalate`,
      {},
      {
        withCredentials: true,
      }
    );

    toast.success("Complaint escalated successfully!");
    return response.data;
  } catch (error) {
    toast.error("Failed to escalate complaint. Please try again.");
  }
};

export default useEscalateComplaint;
