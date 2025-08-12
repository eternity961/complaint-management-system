import { createBrowserRouter } from "react-router-dom";
import {
  Home,
  ProtectedRoute,
  Unauthorized,
  SupervisorLayout,
  SupervisorDashboard,
  ManageUser,
  ManageComplaints,
  Settings,
  ManagerLayout,
  ManagerDashboard,
  Reports,
  DistributiveLayout,
  DistributiveDashboard,
} from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute allowedRoles={["Customer Service Supervisor"]}>
        <SupervisorLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <SupervisorDashboard />,
      },
      {
        path: "manage-user",
        element: <ManageUser />,
      },
      {
        path: "manage-complaints",
        element: <ManageComplaints />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "/gm-dashboard",
    element: (
      <ProtectedRoute allowedRoles={["General Manager"]}>
        <ManagerLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <ManagerDashboard /> },
      {
        path: "reports",
        element: <Reports />,
      },
      {
        path: "manage-complaints",
        element: <ManageComplaints />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "/ds-dashboard",
    element: (
      <ProtectedRoute allowedRoles={["Distribution Supervisor"]}>
        <DistributiveLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DistributiveDashboard /> },
      {
        path: "manage-complaints",
        element: <ManageComplaints />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
]);

export default router;
