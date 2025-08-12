import { Complaint } from "@/assets/constants/complaint";
import axios from "axios";

const useComplaint = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/all-complaints`,
    {
      withCredentials: true,
    }
  );

  const complaints = response.data;

  const counts: Record<string, number> = complaints.reduce(
    (acc: Record<string, number>, complaint: Complaint) => {
      const status = complaint.status || "Unknown";
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    },
    {}
  );

  const statusList = Object.entries(counts).map(([status, count]) => ({
    status,
    count,
  }));

  return statusList;
};

export default useComplaint;
