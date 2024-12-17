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
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import AddDomainGroupDialog from "./AddDomainGroupDialog";
import { toast } from "@/hooks/use-toast";

export const getDomainGroups = async (url: string) => {
  const res = await axios.get(url);
  return res.data.domainGroups;
};

export const DomainGroupTable = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const [selectedDeleteId, setSelectedDeleteId] = useState<string | null>(null);
  const [selectedEditRoleId, setSelectedEditRoleId] = useState<string | null>(
    null
  );

  const [selectedEditRoleTitle, setSelectedEditRoleTitle] = useState<
    string | null
  >(null);

  const handleEditDomainGroup = (id: string, title: string) => {
    setShowEditDialog(true);
    setSelectedEditRoleId(id);
    setSelectedEditRoleTitle(title);
  };
const queryClient = useQueryClient();
  const {
    isLoading,
    error,
    data: domainGroup,
  } = useQuery({
    queryKey: ["domainGroup"],
    queryFn: () => getDomainGroups("/api/domain/get-domain-groups"),
  });
  const deleteMutation = useMutation({
    mutationFn: (id: string) => axios.get(`/api/domain/delete/${id}`),
    onSuccess: () => {
      toast({
        description: "Domain Group Deleted Successfully",
      });
      queryClient.invalidateQueries(["domainGroup"]); 
      setShowDialog(false); 
      setSelectedDeleteId(null); 
      // setShowDialog(true); 
    },
    onError: (error: any) => {
      toast({
        description: error.response?.data?.error || "An error occurred",
        variant: "destructive",
      });
      setShowDialog(false); 
    },
  });
  const handleConfirmDelete = () => {
    if (selectedDeleteId) {
      deleteMutation.mutate(selectedDeleteId);
    }
  };
  const handleDeleteDomainGroup = (id: string) => {
    setSelectedDeleteId(id); 
    setShowDialog(true); 
  };
  return (
    <>
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">Domain Groups</h2>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {error ? (
                <TableRow>
                  <TableCell className="text-center" colSpan={3}>
                    Error Occurred
                  </TableCell>
                </TableRow>
              ) : isLoading ? (
                <TableRow>
                  <TableCell className="text-center" colSpan={3}>
                    Loading...
                  </TableCell>
                </TableRow>
              ) : domainGroup && domainGroup.length > 0 ? (
                domainGroup.map((group: any, i: number) => (
                  <TableRow key={i}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{group.title}</TableCell>
                    <TableCell>
                      <div className="flex space-x-3">
                        <Button
                          variant="link"
                          onClick={() =>
                            handleEditDomainGroup(group.id, group.title)
                          }
                        >
                          Edit
                        </Button>
                        <Button
                          variant="link"
                          className="text-red-500"
                          onClick={() => handleDeleteDomainGroup(group.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell className="text-center" colSpan={3}>
                    No Records Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <AlertDialog open={showDialog}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to delete this Domain Group?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. Deleting this domain group will
                  remove it from the system permanently, and its domains also
                  removed
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setShowDialog(false)}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction onClick={() => handleConfirmDelete()}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
      {showEditDialog && (
        <AddDomainGroupDialog
          selectedEditRoleTitle={selectedEditRoleTitle}
          selectedEditRoleId={selectedEditRoleId}
          onClose={() => {
            setShowEditDialog(false);
          }}
        />
      )}
      {}
    </>
  );
};
