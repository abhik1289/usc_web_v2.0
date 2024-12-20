"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { ChangeRoleDialog } from "./change-role-dialog";
import { useGetUsers } from "@/hooks/api/user/useGetUsers";

interface UserData {
  id: string;
  firstName: string;
  email: string;
  role: string;
  isActive: boolean;
}

export function UserTable() {
  const [data, setData] = useState<UserData[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [role, setRole] = useState<string>("");
  const [editId, setEditId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();


  const users = useGetUsers();

  const deleteUser = async (email: string) => {
    try {
      const response = await axios.post("/api/user/delete-user", { email });
      if (response.data.success) {
        toast({
          description: "User deleted successfully.",
        });
        setData((prevData) => prevData.filter((user) => user.email !== email));
      } else {
        toast({
          description: "An issue occurred while deleting the user.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      // console.log(error)
      toast({
        description: error.response.data.error || "An error occurred.",
        variant: "destructive",
      });
    }
  };

  const handleChangeRole = (userId: string, role: string) => {
    setOpen(true);
    setRole(role);
    setEditId(userId);
  };

  return (
    <>
      <Table className="border rounded-md mt-5">
        <TableCaption>A list of system users and their roles.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Active</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        {
          users.isError ? (
            <TableBody>
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  Error Occurs
                </TableCell>
              </TableRow>
            </TableBody>
          ) : users.isLoading ? (
            <TableBody>
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            </TableBody>
          ) : users.data && users?.data.length === 0 ? (
            <TableBody>
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No users found.
                </TableCell>
              </TableRow>
            </TableBody>
          ) : users.data && users?.data.length > 0 ? (
            <TableBody>
              {users?.data.map((user: any) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.firstName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.isActive ? "Active" : "Inactive"}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <button
                      onClick={() => handleChangeRole(user.id, user.role)}
                      className="text-blue-500 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteUser(user.email)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : null
        }
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5} className="text-right">
              Total Users: {data.length}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <ChangeRoleDialog
        editId={editId}
        role={role}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
}
