import { Complaint } from "@/assets/constants/complaint";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import useComplaintAll from "@/hooks/useComplaintAll";
import { useEffect, useState } from "react";

interface Handler {
  handler: string;
  Resolved: number;
  Pending: number;
  In_Progress: number;
}

const HandlerPerformanceBarChart = () => {
  const [handlerData, setHandlerData] = useState<Handler[]>([]);

  useEffect(() => {
    const fetchHandlerStats = async () => {
      const complaints: Complaint[] = await useComplaintAll();

      const handlerStatsMap: Record<
        string,
        { Resolved: number; Pending: number; In_Progress: number }
      > = {};

      complaints.forEach((c) => {
        const handlerName = c.assignedTo;
        if (!handlerName) return;
        if (!handlerStatsMap[handlerName]) {
          handlerStatsMap[handlerName] = {
            Resolved: 0,
            Pending: 0,
            In_Progress: 0,
          };
        }

        if (c.status === "Resolved") handlerStatsMap[handlerName].Resolved += 1;
        else if (c.status === "Pending")
          handlerStatsMap[handlerName].Pending += 1;
        else if (c.status === "In Progress")
          handlerStatsMap[handlerName].In_Progress += 1;
      });

      const chartData: Handler[] = Object.entries(handlerStatsMap).map(
        ([handler, stats]) => ({
          handler,
          ...stats,
        })
      );

      setHandlerData(chartData);
    };

    fetchHandlerStats();
  }, []);

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Handler Performance</CardTitle>
        <CardDescription>
          Resolved vs Pending vs In Progress Complaints per Handler
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            aspectRatio: {
              label: "Aspect Ratio",
              theme: { light: "2", dark: "2" },
            },
          }}
        >
          <BarChart
            data={handlerData}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="handler" />
            <YAxis />
            <Tooltip content={<ChartTooltipContent />} cursor={false} />
            <Legend />
            <Bar dataKey="Resolved" fill="#2563ea" radius={4} />
            <Bar dataKey="In_Progress" fill="#60a8fb" radius={4} />
            <Bar dataKey="Pending" fill="#8fc2fc" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default HandlerPerformanceBarChart;
