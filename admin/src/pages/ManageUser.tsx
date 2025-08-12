import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User, useUserStore } from "@/store/usersStore";
import UserActions from "@/components/UserActions";
import DeleteConfirmationDialog from "@/components/DeleteConfirmationDialog";

const ManageUser = () => {
  const { users, fetchUsers, deleteUser } = useUserStore();
  const [search, setSearch] = useState("");
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const filteredUsers = (users || []).filter(
    (user) =>
      user.userName.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase())
  );

  const handleDeleteConfirmation = (user: User) => {
    setUserToDelete(user);
    setIsDeleteOpen(true);
  };

  return (
    <div className=" lg:mx-auto mt-8  lg:p-6 md:w-[95%]  ">
      <h1 className="text-2xl font-semibold mb-4">Manage Users</h1>
      <Input
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Table className="mt-4">
        <TableHeader>
          <TableRow>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="md:text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user, index) => (
            <TableRow key={index}>
              <TableCell>{user.userName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <UserActions
                  user={user}
                  onDelete={() => handleDeleteConfirmation(user)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <DeleteConfirmationDialog
        isOpen={isDeleteOpen}
        userToDelete={userToDelete}
        onDeleteConfirm={() => {
          if (userToDelete) {
            deleteUser(userToDelete._id);
          }
          setIsDeleteOpen(false);
          setUserToDelete(null);
        }}
        onCancel={() => {
          setIsDeleteOpen(false);
          setUserToDelete(null);
        }}
      />
    </div>
  );
};

export default ManageUser;
