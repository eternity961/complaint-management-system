import CustomBar from "@/components/CustomBar";
import StatusCard from "@/components/StatusCard";

const SupervisorDashboard = () => {
  return (
    <>
      <div>
        <div className="flex lg:gap-16 gap-4  w-full flex-wrap">
          <StatusCard />
        </div>
        <CustomBar />
      </div>
    </>
  );
};
export default SupervisorDashboard;
