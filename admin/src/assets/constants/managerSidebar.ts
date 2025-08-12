import {
  LayoutDashboard,
  Settings,
  ClipboardList,
  FileBarChart2,
} from "lucide-react";

const managerSidebar = [
  {
    title: "Dashboard",
    path: "/gm-dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Reports",
    path: "/gm-dashboard/reports",
    icon: FileBarChart2,
  },
  {
    title: "Manage Complaints",
    path: "/gm-dashboard/manage-complaints",
    icon: ClipboardList,
  },
  {
    title: "Settings",
    path: "/gm-dashboard/settings",
    icon: Settings,
  },
];

export default managerSidebar;
