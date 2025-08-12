import { useEffect, useState } from "react";
import axios from "axios";

interface Complaint {
  user: string;
  description: string;
  category: string;
  status: string;
  createdAt: string;
}
export const useUserComplaints = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchComplaints = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/complaints`,
          {
            withCredentials: true,
          }
        );
        setComplaints(res.data);
      } catch (err) {
        console.error("Failed to fetch complaints", err);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  return { complaints, loading };
};
