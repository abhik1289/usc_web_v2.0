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
import { CheckCircle, XCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import CustomToolTip from "../CustomToolTip/CustomToolTip";

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
  const { role, email } = useAuthStore();
  const isSuperAdmin = role === "SUPERADMIN";
  const colSpan = isSuperAdmin ? 6 : 5;

  const deleteUser = async (id: string) => {
    setDeleteId(id);
    setShowDialog(true);
  };

  const handleChangeRole = (userId: string, role: Roles) => {
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
            <TableHead>Ban</TableHead>
            {role === "SUPERADMIN" && <TableHead className="text-right">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        {users.isError ? (
          <TableBody>
            <TableRow>
              <TableCell colSpan={colSpan} className="text-center">
                Error Occurs
              </TableCell>
            </TableRow>
          </TableBody>
        ) : users.isLoading ? (
          <TableBody>
            <TableRow>
              <TableCell colSpan={colSpan} className="text-center">
                Loading...
              </TableCell>
            </TableRow>
          </TableBody>
        ) : users.data && users?.data.length === 0 ? (
          <TableBody>
            <TableRow>
              <TableCell colSpan={colSpan} className="text-center">
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
                <TableCell>
                  {user.isBan ? (
                    <CustomToolTip
                      elment={
                        <span className="flex items-center text-red-600">
                          <XCircle className="mr-2" /> Banned
                        </span>
                      }
                      content="This user has access to the admin panel."
                    />

                  ) : (
                    <CustomToolTip
                      elment={
                        <span className="flex items-center text-green-600">
                          <CheckCircle className="mr-2" /> Active
                        </span>
                      }
                      content="his user has access to the admin panel."
                    />
                  )}


                </TableCell>

                {role === "SUPERADMIN" && < TableCell className="text-right space-x-2">
                  <button
                    disabled={user.email === email}
                    onClick={() => handleChangeRole(user.id, user.role)}
                    className="text-blue-500 hover:underline disabled:opacity-50 disabled:hober:cursor-not-allowed disabled:hover:no-underline"
                  >
                    Edit
                  </button>
                  <button
                    disabled={user.email === email}
                    onClick={() => deleteUser(user.id)}
                    className="text-red-500 hover:underline disabled:opacity-50 disabled:hober:cursor-not-allowed disabled:hover:no-underline"
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
            <TableCell colSpan={colSpan} className="text-right">
              Total Users: {users?.data && users.data.length}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table >
      {
        getUser.data &&
        <ChangeRoleDialog
          defaultValues={getUser.data?.user && {
            isBan: getUser.data?.user.isBan,
            role: getUser.data?.user.role,
          }}
          editId={editId}
          // role={role}
          open={open}
          setOpen={setOpen}
        />
      }
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
