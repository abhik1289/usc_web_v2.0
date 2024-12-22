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

import { toast } from "@/hooks/use-toast";
import AddRoleDialog from "./AddRoleDialog";
import AlertDialogBox from "./../AlertDialog.tsx/AlertDialog";
import { useGetRoles } from "@/hooks/api/roles/useGetRoles";
import useDeleteRole from "@/hooks/api/role/useDeleteRole";

const RoleTable = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState<string>("");
  const [selectedEditRoleId, setSelectedEditRoleId] = useState<string | null>(
    null
  );
  const [selectedEditRoleTitle, setSelectedEditRoleTitle] = useState<
    string | null
  >(null);


  const roles = useGetRoles();
  // Mutation for deleting a role
  const deleteMutation = useDeleteRole(selectedRoleId);




  // Handle delete confirmation
  const handleDeleteRole = (id: string) => {
    setSelectedRoleId(id); // Set the selected role to delete
    setShowDialog(true); // Open the confirmation dialog
  };

  const handleConfirmDelete = () => {
    if (selectedRoleId) {
      deleteMutation.mutate(selectedRoleId); // Trigger the mutation with the selected role ID
    }
    setShowDialog(false);
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
          {roles.isError ? (
            <TableBody>
              <TableRow>
                <TableCell className="text-center" colSpan={3}>
                  Error Occurred
                </TableCell>
              </TableRow>
            </TableBody>
          ) : roles.isLoading ? (
            <TableBody>
              <TableRow>
                <TableCell className="text-center" colSpan={3}>
                  Loading...
                </TableCell>
              </TableRow>
            </TableBody>
          ) : roles.data && roles.data.length > 0 ? (
            <TableBody>
              {roles.data.map((role: any, i: number) => (
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
      <AlertDialogBox
        show={showDialog}
        title="Are you sure you want to delete this role?"
        description="This action cannot be undone. Deleting this role will remove it from
            the system permanently, and it cannot be recovered."
        setShow={() => setShowDialog(false)}
        onConfirm={handleConfirmDelete}
      />
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
