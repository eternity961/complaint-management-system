import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import useComplaint from "@/hooks/useComplaint";
import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Legend } from "recharts";

interface Status {
  name: string;
  value: number;
}

const COLORS = ["#FFBB28", "#0088FE", "#FF8042"];

const StatusPieChart = () => {
  const [statusData, setStatusData] = useState<Status[]>([]);

  useEffect(() => {
    const fetchStatusCounts = async () => {
      const statusList = await useComplaint();

      setStatusData(
        statusList.map(({ status, count }) => ({ name: status, value: count }))
      );
    };

    fetchStatusCounts();
  }, []);

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Complaint Status Distribution</CardTitle>
        <CardDescription>
          Overall complaint resolution breakdown
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{ aspectRatio: { label: "Aspect Ratio", color: "#2563ea" } }}
        >
          <PieChart>
            <Pie
              data={statusData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
            >
              {statusData.map((_, i) => (
                <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default StatusPieChart;
