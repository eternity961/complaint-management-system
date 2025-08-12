import axios from "axios";

const useComplaintAll = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/all-complaints`,
    {
      withCredentials: true,
    }
  );

  const complaints = response.data;

  return complaints;
};

export default useComplaintAll;
