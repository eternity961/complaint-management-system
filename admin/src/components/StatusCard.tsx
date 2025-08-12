import { JSX, useEffect, useState } from "react";
import { Hourglass, Loader, CheckCircle } from "lucide-react";
import useComplaint from "@/hooks/useComplaint";

type StatusCount = {
  status: string;
  count: number;
};

const statusIcons: Record<string, JSX.Element> = {
  Pending: <Hourglass className="text-yellow-500 text-3xl" />,
  "In Progress": <Loader className="text-blue-500 text-3xl" />,
  Resolved: <CheckCircle className="text-green-500 text-3xl" />,
};

const StatusCard = () => {
  const [statusData, setStatusData] = useState<StatusCount[]>([]);

  useEffect(() => {
    const fetchStatusCounts = async () => {
      const statusList = await useComplaint();

      setStatusData(statusList);
    };

    fetchStatusCounts();
  }, []);

  return (
    <div className="flex flex-wrap gap-4 md:ms-10 md:mt-4">
      {statusData.map(({ status, count }) => (
        <div
          key={status}
          className="flex gap-4 items-center bg-white dark:bg-dark p-6 rounded-2xl shadow w-full sm:w-[250px]"
        >
          <div>
            {statusIcons[status] || (
              <Hourglass className="text-gray-400 text-3xl" />
            )}
          </div>
          <div>
            <h3 className="text-xl font-semibold">{status}</h3>
            <p className="text-lg">{count}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatusCard;
