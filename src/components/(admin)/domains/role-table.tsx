"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";
import AddRoleDialog from "./AddRoleDialog";

const RoleTable = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);
  const [selectedEditRoleId, setSelectedEditRoleId] = useState<string | null>(null);

  const [selectedEditRoleTitle, setSelectedEditRoleTitle] = useState<string | null>(
    null
  );

  const queryClient = useQueryClient();

  // Mutation for deleting a role
  const deleteMutation = useMutation({
    mutationFn: (id: string) => axios.get(`/api/domain/delete-role/${id}`),
    onSuccess: () => {
      toast({
        description: "Role Deleted Successfully",
      });
      queryClient.invalidateQueries(["roles"]); // Refetch the roles after deletion
      setShowDialog(false); // Close the dialog
      setSelectedRoleId(null); // Reset selected role id
    },
    onError: (error: any) => {
      toast({
        description: error.response?.data?.error || "An error occurred",
        variant: "destructive",
      });
    },
  });

  // Fetch roles using useQuery
  const getRoles = async (url: string) => {
    const res = await axios.get(url);
    return res.data.roles;
  };

  const {
    isLoading,
    error,
    data: rolesData,
  } = useQuery({
    queryKey: ["roles"],
    queryFn: () => getRoles("/api/domain/get-roles"),
  });

  // Handle delete confirmation
  const handleDeleteRole = (id: string) => {
    setSelectedRoleId(id); // Set the selected role to delete
    setShowDialog(true); // Open the confirmation dialog
  };

  const handleConfirmDelete = () => {
    if (selectedRoleId) {
      deleteMutation.mutate(selectedRoleId); // Trigger the mutation with the selected role ID
    }
  };

  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-bold">Roles</h2>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Role Title</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          {error ? (
            <TableBody>
              <TableRow>
                <TableCell className="text-center" colSpan={3}>
                  Error Occurred
                </TableCell>
              </TableRow>
            </TableBody>
          ) : isLoading ? (
            <TableBody>
              <TableRow>
                <TableCell className="text-center" colSpan={3}>
                  Loading...
                </TableCell>
              </TableRow>
            </TableBody>
          ) : rolesData && rolesData.length > 0 ? (
            <TableBody>
              {rolesData.map((role: any, i: number) => (
                <TableRow key={i}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{role.title}</TableCell>
                  <TableCell>
                    <div className="flex space-x-3">
                      <Button
                        onClick={() => {
                          setShowEditDialog(true);
                          setSelectedEditRoleTitle(role.title);
                          setSelectedEditRoleId(role.id);
                        }}
                        variant="link"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="link"
                        className="text-red-500"
                        onClick={() => handleDeleteRole(role.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell className="text-center" colSpan={3}>
                  No Records Found
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </CardContent>

      {/* Delete confirmation dialog */}
      <AlertDialog open={showDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this role?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Deleting this role will remove it
              from the system permanently, and it cannot be recovered.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowDialog(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete} // Confirm delete when "Yes" is clicked
            >
              Yes, Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {showEditDialog && (
        <AddRoleDialog
          onClose={() => {
            setShowEditDialog(false);
          }}
          selectedEditRoleTitle={selectedEditRoleTitle}
          showEditDialog={showEditDialog}
          editingRole={true}
          selectedEditRoleId={selectedEditRoleId}
        />
      )}
    </Card>
  );
};

export default RoleTable;
