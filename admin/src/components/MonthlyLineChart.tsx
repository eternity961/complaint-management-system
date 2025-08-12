import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import useComplaintAll from "@/hooks/useComplaintAll";
import { useEffect, useState } from "react";
import { Complaint } from "@/assets/constants/complaint";

interface Month {
  month: string;
  count: number;
}

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const MonthlyLineChart = () => {
  const [data, setData] = useState<Month[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const complaints: Complaint[] = await useComplaintAll();

      const counts: Record<string, number> = {};

      complaints.forEach((complaint) => {
        const date = new Date(complaint.createdAt);
        const month = monthNames[date.getMonth()];
        counts[month] = (counts[month] || 0) + 1;
      });

      const chartData: Month[] = monthNames.map((month) => ({
        month,
        count: counts[month] || 0,
      }));

      setData(chartData);
    };

    fetchData();
  }, []);

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Monthly Complaint Trends</CardTitle>
        <CardDescription>January - December</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            aspectRatio: {
              label: "Aspect Ratio",
              icon: undefined,
              color: "#2563ea",
            },
          }}
        >
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip
              content={<ChartTooltipContent indicator="dashed" />}
              cursor={{ stroke: "#8884d8", strokeDasharray: "5 5" }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#2563ea"
              strokeWidth={2}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default MonthlyLineChart;
