import { LayoutDashboard, Users, Settings, ClipboardList } from "lucide-react";

const adminSidebar = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Manage Users",
    path: "/dashboard/manage-user",
    icon: Users,
  },
  {
    title: "Manage Complaints",
    path: "/dashboard/manage-complaints",
    icon: ClipboardList,
  },
  {
    title: "Settings",
    path: "/dashboard/settings",
    icon: Settings,
  },
];

export default adminSidebar;
