import { Complaint } from "@/assets/constants/complaint";
import axios from "axios";

export interface ChartDataItem {
  categories: string;
  Pending: number;
  "In Progress": number;
  Resolved: number;
}
const useBarComplaint = async () => {
  const res = await axios.get<Complaint[]>(
    `${import.meta.env.VITE_API_URL}/api/all-complaints`,
    {
      withCredentials: true,
    }
  );

  const complaints = res.data;

  // Group complaints by category and count by status
  const grouped = complaints.reduce(
    (acc: Record<string, ChartDataItem>, complaint) => {
      const category = complaint.category;
      const status = complaint.status;

      if (!acc[category]) {
        acc[category] = {
          categories: category,
          Pending: 0,
          "In Progress": 0,
          Resolved: 0,
        };
      }

      acc[category][status] += 1;

      return acc;
    },
    {}
  );

  // Convert grouped object to array for Recharts
  const finalData: ChartDataItem[] = Object.values(grouped);

  return finalData;
};
export default useBarComplaint;
