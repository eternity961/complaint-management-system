import { Button } from "@/components/ui/button";
import { User, useUserStore } from "@/store/usersStore";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { UserPlus2Icon, UserMinus2Icon, Trash2Icon } from "lucide-react"; // import icons

interface Props {
  user: User;
  onDelete: () => void;
}

const UserActions = ({ user, onDelete }: Props) => {
  const { suspendUser, unSuspendUser } = useUserStore();

  const handleSuspendToggle = async () => {
    if (user.isSuspended) {
      await unSuspendUser(user._id);
    } else {
      await suspendUser(user._id);
    }
  };

  return (
    <div className="flex gap-2 justify-end">
      {/* Suspend/Unsuspend Button with Tooltip and Icon */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            onClick={handleSuspendToggle}
            className={
              user.isSuspended
                ? "text-green-600 border-green-600 cursor-pointer"
                : "text-red-600 border-red-600 cursor-pointer"
            }
          >
            {/* Display icon based on user suspended state */}
            {user.isSuspended ? (
              <UserPlus2Icon size={20} />
            ) : (
              <UserMinus2Icon size={20} />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent className="dark:text-white">
          {user.isSuspended ? "Unsuspend User" : "Suspend User"}
        </TooltipContent>
      </Tooltip>

      {/* Delete Button with Tooltip */}
      <Button
        className="cursor-pointer"
        variant="destructive"
        onClick={onDelete}
      >
        <Trash2Icon size={20} />
      </Button>
    </div>
  );
};

export default UserActions;
