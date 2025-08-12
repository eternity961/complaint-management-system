import CustomBar from "@/components/CustomBar";
import HandlerPerformanceBarChart from "@/components/HandlerPerformanceBarChart";
import MonthlyLineChart from "@/components/MonthlyLineChart";
import StatusCard from "@/components/StatusCard";
import StatusPieChart from "@/components/StatusPieChart";

const ManagerDashboard = () => {
  return (
    <>
      <div>
        <div className="flex lg:gap-16 gap-4  w-full flex-wrap">
          <StatusCard />
        </div>
        <div>
          <CustomBar />
          <div className=" lg:mx-auto   lg:p-6 md:w-[97%]  ">
            <StatusPieChart />
            <MonthlyLineChart />
            <HandlerPerformanceBarChart />
          </div>
        </div>
      </div>
    </>
  );
};
export default ManagerDashboard;
