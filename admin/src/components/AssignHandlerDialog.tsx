import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useEscalateComplaint from "@/hooks/useEscalateComplaint";

interface AssignHandlerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAssign: (handlerId: string) => void;
  complaintId: string;
}

const AssignHandlerDialog: React.FC<AssignHandlerDialogProps> = ({
  isOpen,
  onClose,
  complaintId,
}) => {
  const handleEscalate = async () => {
    try {
      await useEscalateComplaint(complaintId);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogDescription></DialogDescription>
          <DialogTitle>Escalate Complaint</DialogTitle>
        </DialogHeader>

        <div className="flex justify-end gap-2 mt-4">
          <Button
            className="dark:text-white cursor-pointer"
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            className="dark:text-white cursor-pointer"
            onClick={handleEscalate}
          >
            Escalate
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AssignHandlerDialog;
