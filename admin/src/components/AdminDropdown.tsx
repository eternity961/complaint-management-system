import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Settings, LogOut, User2Icon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { useState } from "react";
import useLogout from "@/hooks/useLogout";
// import useLogout from "@/hooks/useLogout";
// import useUserStore from "@/store/userStore";

interface User {
  firstName: string;
  lastName: string;
}
const AdminDropdown = () => {
  const { logoutUser } = useLogout();
  const { handleSubmit } = useForm();
  const location = useLocation();

  let url = location.pathname.startsWith("/ds-dashboard")
    ? "ds-"
    : location.pathname.startsWith("/gm-dashboard")
    ? "gm-"
    : "";
  let admin = location.pathname.startsWith("/ds-dashboard")
    ? "DS Supervisor"
    : location.pathname.startsWith("/gm-dashboard")
    ? " G.Manager"
    : "CS Supervisor";
  const [user, _setUser] = useState<User>();

  return (
    <div>
      <DropdownMenu>
        {/* Fix: Use asChild to prevent extra button wrapping */}
        <DropdownMenuTrigger asChild>
          <Button className="dark:text-white cursor-pointer flex items-center gap-2">
            <User2Icon />
            {user ? user.firstName : admin}
            <ChevronDown size="16px" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {/* Fix: Use asChild to ensure Link replaces DropdownMenuItem properly */}

          <DropdownMenuItem asChild>
            <Link className="cursor-pointer" to={`/${url}dashboard/settings`}>
              <Settings size={16} />
              Profile & Settings
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <form onSubmit={handleSubmit(logoutUser)}>
              <Button
                className="flex cursor-pointer items-center justify-center w-full"
                variant="outline"
              >
                <LogOut size={16} />
                Logout
              </Button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AdminDropdown;
