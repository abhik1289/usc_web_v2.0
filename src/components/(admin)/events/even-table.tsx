import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Card } from '@/components/ui/card'
import React, { useState } from 'react'
import { useToast } from "@/hooks/use-toast";
import { QueryClient, useMutation } from "@tanstack/react-query";

import TableBodyBox from "./TableBody";





const EventTable: React.FC = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [deleteId, setDeleteId] = useState<string>("");

  const { toast } = useToast();
  const queryClient = new QueryClient();
  // const deleteMutation = useMutation({
  //   mutationFn: (id: string) => axios.get(`/api/event/delete-event/${id}`), // Use DELETE method

  //   onError: (err, id, context) => {

  //   },
  //   onSuccess: () => {
  //     toast({
  //       description: "Deleted event",
  //       variant: "destructive",
  //     });
  //     // refetch(); // Refetch to ensure data is fresh after deletion
  //   },
  // });

  // const visibilityMutation = useMutation({
  //   mutationFn: (id: string) => axios.get(`/api/event/change-view/${id}`),
  //   onMutate: async (id: string) => {
  //     await queryClient.cancelQueries(["events"]);
  //     const previousEvents = queryClient.getQueryData<Event>(["events"]);

  //     return { previousEvents }; // Return context for rollback
  //   },
  //   onError: (err, id, context) => {
  //     // Rollback to previous state in case of error
  //     if (context?.previousEvents) {
  //       queryClient.setQueryData<Event>(["events"], context.previousEvents);
  //     }
  //   },
  //   onSuccess: () => {
  //     toast({
  //       description: "Change Visibility",
  //       // variant: "destructive",
  //     });
  //     // refetch(); // Refetch to ensure data is fresh after deletion
  //   },
  // });

  const handleDeleteEvent = (id: string) => {
    setShowDialog(true);
    setDeleteId(id);
  };

  const handleVisibility = (id: string) => {
    // visibilityMutation.mutate(id);
  };
  const handleConfirmDelete = () => {
    if (deleteId) {
      // deleteMutation.mutate(deleteId);
    }
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
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBodyBox handleDeleteEvent={handleDeleteEvent} />
      </Table>
    </Card>
  )
}


export default EventTable;