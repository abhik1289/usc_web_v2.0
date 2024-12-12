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

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  // ... add other required properties
}

export function UserTable() {
  const [data, setData] = useState<UserData[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get("/api/user/get-users");
        if (response.data.success) {
          setData(response.data.users);
        } else {
          toast({
            description: "Failed to fetch users.",
            variant: "destructive",
          });
        }
      } catch {
        toast({
          description: "An error occurred while fetching users.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, [toast]);

  const deleteUser = async (email: string) => {
    try {
      const res = await axios.post("/api/user/delete-user", {
        email,
      });
      if (res.data.success) {
        toast({
          description: "Successfully deleted",
        });
      } else {
        toast({
          description: "Problem Occured",
          variant: "destructive",
        });
      }
    } catch (error: Error | unknown) {
      const err = error as Error;
      toast({
        description: err.message || "Problem Occurred",
        variant: "destructive",
      });
    }
  };

  function changeRole(_email: string) {
    setOpen(true);
  }

  return (
    <>
      <Table className="border rounded-md mt-5">
        <TableCaption>A list of system users and their roles.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Fullname</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        {loading ? (
          <TableBody>
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                Loading...
              </TableCell>
            </TableRow>
          </TableBody>
        ) : data.length > 0 ? (
          <TableBody>
            {data.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">
                  {user.name}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell className="text-right space-x-2">
                  <button
                    onClick={() => changeRole(user.email)}
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
        ) : (
          <TableBody>
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No users found
              </TableCell>
            </TableRow>
          </TableBody>
        )}
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4} className="text-right">
              Total Users: {data.length}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <ChangeRoleDialog open={open} setOpen={setOpen} />
    </>
  );
}
