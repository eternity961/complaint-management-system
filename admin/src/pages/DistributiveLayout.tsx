import DistributiveSidebar from "@/components/DistibutiveSIdebar";
import DistributiveNavbar from "@/components/DistributiveNavbar";
import { Outlet } from "react-router-dom";

const DistributiveLayout = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col ">
        <DistributiveNavbar />

        <div className="flex flex-1">
          <aside className="w-64 hidden md:block">
            <DistributiveSidebar />
          </aside>
          <main className="flex-1   p-6 sm:p-4 sidebar-height overflow-auto ">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};
export default DistributiveLayout;
