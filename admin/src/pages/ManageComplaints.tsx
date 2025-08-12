import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EyeIcon, Pencil, UserPlus } from "lucide-react";
import { Complaint } from "@/assets/constants/complaint";
import EditComplaintForm from "@/components/EditComplaintForm";
import AssignHandlerDialog from "@/components/AssignHandlerDialog";
import useComplaintAll from "@/hooks/useComplaintAll";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ManageComplaints = () => {
  const [search, setSearch] = useState("");
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(
    null
  );
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAssignOpen, setIsAssignOpen] = useState(false);

  const fetchComplaint = async () => {
    try {
      const fetchedComplaint = await useComplaintAll();
      setComplaints(fetchedComplaint);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  };

  useEffect(() => {
    fetchComplaint();
  }, []);

  const filteredComplaints = complaints.filter(
    (complaint) =>
      complaint.category?.toLowerCase().includes(search.toLowerCase()) ||
      complaint.status?.toLowerCase().includes(search.toLowerCase()) ||
      complaint.description?.toLowerCase().includes(search.toLowerCase())
  );

  const handleAssignHandler = (handlerId: string) => {
    if (!selectedComplaint?._id) return;

    setComplaints((prev) =>
      prev.map((complaint) =>
        complaint._id === selectedComplaint._id
          ? { ...complaint, assignedHandler: handlerId }
          : complaint
      )
    );
  };

  return (
    <div className="lg:mx-auto mt-8 lg:p-6 md:w-[95%]">
      <h1 className="text-2xl font-semibold mb-4">Manage Complaints</h1>
      <Input
        placeholder="Search complaints..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Table className="mt-4">
        <TableHeader>
          <TableRow>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredComplaints.map((complaint, index) => (
            <TableRow key={index}>
              <TableCell>
                {complaint.description.length > 40
                  ? complaint.description.slice(0, 40) + " . . ."
                  : complaint.description}
              </TableCell>
              <TableCell>{complaint.category}</TableCell>
              <TableCell>
                {" "}
                {
                  <Badge
                    className="text-white"
                    variant={
                      complaint.status === "Resolved"
                        ? "default"
                        : complaint.status === "In Progress"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {complaint.status}
                  </Badge>
                }
              </TableCell>
              <TableCell className="flex gap-2">
                <Button
                  className="cursor-pointer dark:text-white"
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    setSelectedComplaint(complaint);
                    setIsEditOpen(true);
                  }}
                >
                  <Pencil size={16} />
                </Button>
                <Button
                  className="cursor-pointer dark:text-white"
                  variant="default"
                  size="icon"
                  onClick={() => {
                    setSelectedComplaint(complaint);
                    setIsAssignOpen(true);
                  }}
                >
                  <UserPlus size={16} />
                </Button>

                {complaint.supportingFile && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        className="cursor-pointer dark:text-white"
                        size="icon"
                        onClick={() => {
                          window.open(complaint.supportingFile, "_blank");
                        }}
                      >
                        <EyeIcon size={16} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="dark:text-white">
                      View Supporting File
                    </TooltipContent>
                  </Tooltip>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedComplaint && (
        <EditComplaintForm
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          complaint={selectedComplaint}
          setComplaints={setComplaints}
        />
      )}

      {selectedComplaint && (
        <AssignHandlerDialog
          isOpen={isAssignOpen}
          onClose={() => setIsAssignOpen(false)}
          onAssign={handleAssignHandler}
          complaintId={selectedComplaint._id}
        />
      )}
    </div>
  );
};

export default ManageComplaints;
