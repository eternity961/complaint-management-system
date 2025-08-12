import ManagerNavbar from "@/components/ManagerNavbar";
import ManagerSidebar from "@/components/ManagerSidebar";
import { Outlet } from "react-router-dom";

const ManagerLayout = () => {
  return (
    <div className="min-h-screen flex flex-col ">
      <ManagerNavbar />

      <div className="flex flex-1">
        <aside className="w-64 hidden md:block">
          <ManagerSidebar />
        </aside>
        <main className="flex-1   p-6 sm:p-4 sidebar-height overflow-auto ">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default ManagerLayout;
