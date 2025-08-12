import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Complaint } from "@/assets/constants/complaint";
import useResolveComplaint from "@/hooks/useResolveComplaint";
import { toast } from "react-toastify";
import { z, ZodError } from "zod";

interface EditComplaintFormProps {
  isOpen: boolean;
  onClose: () => void;
  complaint: Complaint;
  setComplaints: React.Dispatch<React.SetStateAction<Complaint[]>>;
}

const complaintStatusSchema = z.object({
  status: z.enum(["In Progress", "Resolved"]),
});

const EditComplaintForm = ({
  isOpen,
  onClose,
  complaint,
  setComplaints,
}: EditComplaintFormProps) => {
  const [updatedComplaint, setUpdatedComplaint] = useState(complaint);

  useEffect(() => {
    setUpdatedComplaint(complaint);
  }, [complaint]);

  const handleSave = async () => {
    try {
      complaintStatusSchema.parse({ status: updatedComplaint.status });

      const updated: Complaint = await useResolveComplaint(
        updatedComplaint._id,
        updatedComplaint.status
      );
      setComplaints((prev) =>
        prev.map((c) => (c._id === updatedComplaint._id ? updated : c))
      );
      onClose();
    } catch (error) {
      if (error instanceof ZodError) {
        toast.error("Please select a status.");
      } else {
        toast.error("Something went wrong. Try again later.");
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Complaint</DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <Input value={updatedComplaint.category} disabled className="mb-2" />
        <Input
          disabled
          value={updatedComplaint.description}
          onChange={(e) =>
            setUpdatedComplaint({
              ...updatedComplaint,
              description: e.target.value,
            })
          }
          className="mb-2"
        />
        <select
          className="border p-2 rounded w-full dark:bg-dark"
          value={updatedComplaint.status}
          onChange={(e) =>
            setUpdatedComplaint({
              ...updatedComplaint,
              status: e.target.value as Complaint["status"],
            })
          }
        >
          <option value="">-- Select Status --</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>
        {}
        <Button
          className="mt-4 cursor-pointer dark:text-white"
          onClick={handleSave}
        >
          Save Changes
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default EditComplaintForm;
