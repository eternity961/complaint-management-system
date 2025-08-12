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
  userToDelete: User | null;
  onDeleteConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmationDialog = ({
  isOpen,
  userToDelete,
  onDeleteConfirm,
  onCancel,
}: Props) => (
  <Dialog open={isOpen} onOpenChange={onCancel}>
    <DialogContent>
      <DialogHeader>
        <DialogDescription></DialogDescription>

        <DialogTitle>Confirm Delete</DialogTitle>
      </DialogHeader>
      <p>Are you sure you want to delete {userToDelete?.userName}?</p>
      <Button
        className="cursor-pointer"
        variant="destructive"
        onClick={onDeleteConfirm}
      >
        Confirm Delete
      </Button>
      <Button className="cursor-pointer" variant="secondary" onClick={onCancel}>
        Cancel
      </Button>
    </DialogContent>
  </Dialog>
);

export default DeleteConfirmationDialog;
