export interface Complaint {
  _id: string;
  user: {
    firstName: string;
    lastName: string;
  };
  category: string;
  description: string;
  status: "Pending" | "In Progress" | "Resolved";
  createdAt: string;
  assignedTo?: string;
  assignedHandler?: string;
  supportingFile: string;
}
