import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { User } from "@/store/usersStore";

interface Props {
  isOpen: boolean;
  userToUpdate: User | null;
  onStatusChangeConfirm: () => void;
  onCancel: () => void;
}

const StatusChangeConfirmationDialog = ({
  isOpen,
  userToUpdate,
  onStatusChangeConfirm,
  onCancel,
}: Props) => (
  <Dialog open={isOpen} onOpenChange={onCancel}>
    <DialogContent>
      <DialogHeader>
        <DialogDescription></DialogDescription>

        <DialogTitle>Confirm Status Change</DialogTitle>
      </DialogHeader>
      <p>
        Are you sure you want to{" "}
        {userToUpdate?.status === "Active" ? "suspend" : "activate"}{" "}
        {userToUpdate?.userName}?
      </p>
      <Button
        className="cursor-pointer"
        variant="destructive"
        onClick={onStatusChangeConfirm}
      >
        Confirm
      </Button>
      <Button className="cursor-pointer" variant="secondary" onClick={onCancel}>
        Cancel
      </Button>
    </DialogContent>
  </Dialog>
);

export default StatusChangeConfirmationDialog;
