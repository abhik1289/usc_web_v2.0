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
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@radix-ui/react-alert-dialog";
import {
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import AddDomainGroupDialog from "./AddDomainGroupDialog";

export const getDomainGroups = async (url: string) => {
  const res = await axios.get(url);
  return res.data.domainGroups;
};

export const DomainGroupTable = () => {
  const [showDialog, setShowDialog] = useState(true);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);
  const [selectedEditRoleId, setSelectedEditRoleId] = useState<string | null>(
    null
  );

  const [selectedEditRoleTitle, setSelectedEditRoleTitle] = useState<
    string | null
  >(null);

  const handleDeleteDomain = (id: string) => {};
  const handleEditDomainGroup = (id: string, title: string) => {
    setShowEditDialog(true);
    setSelectedEditRoleId(id);
    setSelectedEditRoleTitle(title);
  };

  const {
    isLoading,
    error,
    data: domainGroup,
  } = useQuery({
    queryKey: ["domainGroup"],
    queryFn: () => getDomainGroups("/api/domain/get-domain-groups"),
  });

  const handleConfirmDelete = () => {};
  const handleDeleteDomainGroup = (id: string) => {
    setSelectedRoleId(id); // Set the selected role to delete
    setShowDialog(true); //
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
      {
         <AlertDialog  open={false} >
         {/* <AlertDialogTrigger asChild>
           <Button variant="outline">Show Dialog</Button>
         </AlertDialogTrigger> */}
         <AlertDialogContent>
           <AlertDialogHeader>
             <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
             <AlertDialogDescription>
               This action cannot be undone. This will permanently delete your
               account and remove your data from our servers.
             </AlertDialogDescription>
           </AlertDialogHeader>
           <AlertDialogFooter>
             <AlertDialogCancel>Cancel</AlertDialogCancel>
             <AlertDialogAction>Continue</AlertDialogAction>
           </AlertDialogFooter>
         </AlertDialogContent>
       </AlertDialog>
      }
    </>
  );
};
