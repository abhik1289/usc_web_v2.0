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
import { ChangeRoleDialog, Roles } from "./change-role-dialog";
import { useGetUsers } from "@/hooks/api/user/useGetUsers";
import AlertDialogBox from "../AlertDialog.tsx/AlertDialog";
import { useDeleteUser } from "@/hooks/api/user/useDeleteUser";
import useAuthStore from "@/store/Auth";
import { useGetUserByIdMutation } from "@/hooks/api/user/useGetUserById";

interface UserData {
  id: string;
  firstName: string;
  email: string;
  role: string;
  isActive: boolean;
}

export function UserTable() {
  const [open, setOpen] = useState<boolean>(false);
  const [userRole, setRole] = useState<Roles>("MODERATOR");
  const [editId, setEditId] = useState<string>("");
  const [deleteId, setDeleteId] = useState<string>("");
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");

  const users = useGetUsers();
  const deleteUserMutation = useDeleteUser(deleteId);
  const getUser = useGetUserByIdMutation();
  const { role } = useAuthStore();


  const deleteUser = async (id: string) => {
    setDeleteId(id);
    setShowDialog(true);
  };

  const handleChangeRole = (userId: string, role: Roles) => {
    console.log("Role is", role);
    setOpen(true);
    setEditId(userId);
    setRole(role);
    setUserId(userId);
    getUser.mutate({ id: userId });
  };
  console.log(getUser.data?.user)
  const handleDeleteConfirm = () => {
    if (deleteId) {
      deleteUserMutation.mutate(deleteId);
    }
    setShowDialog(false);
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
            {role === "SUPERADMIN" && <TableHead className="text-right">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        {users.isError ? (
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
                {role === "SUPERADMIN" && < TableCell className="text-right space-x-2">
                  <button
                    onClick={() => handleChangeRole(user.id, user.role)}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </TableCell>}
              </TableRow>
            ))}
          </TableBody>
        ) : null}
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5} className="text-right">
              Total Users: {users?.data && users.data.length}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table >
      {getUser.data &&
        <ChangeRoleDialog
          defaultValues={getUser.data?.user && {
            isBan: getUser.data?.user.isBan,
            role: getUser.data?.user.role,
          }}
          editId={editId}
          // role={role}
          open={open}
          setOpen={setOpen}
        />}
      < AlertDialogBox
        title="Delete User Confirmation"
        description="Are you sure you want to delete this user? This action cannot be undone."
        show={showDialog}
        onConfirm={handleDeleteConfirm}
        setShow={() => setShowDialog(false)
        }
      />
    </>
  );
}
