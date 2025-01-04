import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from '@/components/ui/card'
import React, { useState } from 'react'
import TableBodyBox from "./TableBody";
import useDeleteEvent from "@/hooks/api/events/useDeleteEvent";
import AlertDialogBox from "../AlertDialog.tsx/AlertDialog";





const EventTable: React.FC = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [deleteId, setDeleteId] = useState<string>("");

  const deleteMutation = useDeleteEvent(deleteId);



  const handleDeleteEvent = (id: string) => {
    setShowDialog(true);
    setDeleteId(id);
  };


  const handleConfirmDelete = () => {
    if (deleteId) {
      deleteMutation.mutate(deleteId, {
        onSuccess: () => {
          setDeleteId("");
        }
      });

    }
    setShowDialog(false);
  }
  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Venue</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBodyBox handleDeleteEvent={handleDeleteEvent} />
      </Table>
      <AlertDialogBox
        title="Confirm Event Deletion"
        description="Are you sure you want to delete this event? This action cannot be undone."
        show={showDialog}
        setShow={() => setShowDialog(false)}
        onConfirm={handleConfirmDelete}
      />
    </Card>
  )
}


export default EventTable;