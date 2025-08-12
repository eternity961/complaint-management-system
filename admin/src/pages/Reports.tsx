import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { Complaint } from "@/assets/constants/complaint";
import useComplaintAll from "@/hooks/useComplaintAll";
import { Badge } from "@/components/ui/badge";
import { format, isSameMonth } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Card, CardHeader } from "@/components/ui/card";

const Reports = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [search, setSearch] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const fetchedComplaint = await useComplaintAll();
        setComplaints(fetchedComplaint);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };
    fetchComplaint();
  }, []);

  const filteredComplaints = complaints.filter(
    (complaint) =>
      isSameMonth(new Date(complaint.createdAt), selectedMonth) &&
      (complaint.category?.toLowerCase().includes(search.toLowerCase()) ||
        complaint.status?.toLowerCase().includes(search.toLowerCase()) ||
        complaint.description?.toLowerCase().includes(search.toLowerCase()))
  );

  const totalComplaints = filteredComplaints.length;

  const statusSummary = {
    pending: filteredComplaints.filter((c) => c.status === "Pending").length,
    resolved: filteredComplaints.filter((c) => c.status === "Resolved").length,
    inProgress: filteredComplaints.filter((c) => c.status === "In Progress")
      .length,
  };

  const categoryCount: Record<string, number> = {};
  filteredComplaints.forEach((c) => {
    if (c.category) {
      categoryCount[c.category] = (categoryCount[c.category] || 0) + 1;
    }
  });

  const exportPDF = () => {
    const doc = new jsPDF();

    doc.text("Complaints Report", 20, 10);
    doc.text("Complaints Report", 20, 10);
    doc.text(`Month: ${format(selectedMonth, "MMMM yyyy")}`, 20, 20);
    doc.text(`Total Complaints: ${totalComplaints}`, 20, 30);
    doc.text(
      `Pending: ${statusSummary.pending}, In Progress: ${statusSummary.inProgress}, Resolved: ${statusSummary.resolved}`,
      20,
      40
    );

    autoTable(doc, {
      startY: 50,
      head: [["Description", "Category", "Status", "Created At"]],
      body: filteredComplaints.map((c) => [
        c.description,
        c.category,
        c.status,
        format(new Date(c.createdAt), "hh:mm a, MM-dd-yyyy"),
      ]),
    });

    const finalY = (doc as any).lastAutoTable.finalY || 30;

    autoTable(doc, {
      startY: finalY + 10,
      head: [["Category", "Number of Complaints"]],
      body: Object.entries(categoryCount).map(([category, count]) => [
        category,
        count.toString(),
      ]),
    });

    doc.save(
      `Complaints_Report ${format(new Date(Date.now()), "MMMM, yyyy")}.pdf`
    );
  };

  return (
    <div className="lg:mx-auto mt-8 lg:p-6 md:w-[95%]">
      <h1 className="text-2xl font-semibold mb-4">Reports & Analytics</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <DatePicker
          selected={selectedMonth}
          onChange={(date: Date | null) => date && setSelectedMonth(date)}
          dateFormat="MMMM, yyyy"
          showMonthYearPicker
          className="w-full p-1 rounded border dark:bg-dark dark:text-white dark:border-gray-600"
        />
        <Input
          placeholder="Search complaints..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="md:flex-1"
        />
        <Button onClick={exportPDF} className="cursor-pointer dark:text-white">
          Export to PDF
        </Button>
      </div>

      {filteredComplaints.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredComplaints.map((c, index) => (
              <TableRow key={index}>
                <TableCell>
                  {c.description.length > 40
                    ? c.description.slice(0, 40) + " . . ."
                    : c.description}
                </TableCell>
                <TableCell>{c.category}</TableCell>
                <TableCell>
                  <Badge
                    className="text-white"
                    variant={
                      c.status === "Resolved"
                        ? "default"
                        : c.status === "In Progress"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {c.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {format(new Date(c.createdAt), " hh:mm a, MM-dd-yyyy")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <p className="text-3xl font-bold py-4">
        Total Complaints: {totalComplaints}
      </p>

      <div className="mb-4">
        <div className="flex gap-4 mt-2 flex-wrap md:flex-nowrap">
          <Card className="bg-destructive text-white w-full flex justify-center text-2xl">
            <CardHeader>
              Pending: {"  "}
              {statusSummary.pending}
            </CardHeader>
          </Card>
          <Card className="bg-secondary text-white w-full flex justify-center text-2xl">
            <CardHeader>
              In Progress: {"  "}
              {statusSummary.inProgress}
            </CardHeader>
          </Card>
          <Card className="bg-primary text-white w-full flex justify-center text-2xl">
            <CardHeader>Resolved: {statusSummary.resolved}</CardHeader>
          </Card>
        </div>
      </div>

      {filteredComplaints.length > 0 && (
        <div className="mb-6">
          <h3 className="text-3xl py-4 font-bold">Category Breakdown</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Number of Complaints</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(categoryCount).map(([cat, count], index) => (
                <TableRow key={index}>
                  <TableCell>{cat}</TableCell>
                  <TableCell>{count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default Reports;
