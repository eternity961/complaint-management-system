import { LayoutDashboard, Settings, ClipboardList } from "lucide-react";

const distributiveSidebar = [
  {
    title: "Dashboard",
    path: "/ds-dashboard",
    icon: LayoutDashboard,
  },

  {
    title: "Manage Complaints",
    path: "/ds-dashboard/manage-complaints",
    icon: ClipboardList,
  },
  {
    title: "Settings",
    path: "/ds-dashboard/settings",
    icon: Settings,
  },
];

export default distributiveSidebar;
