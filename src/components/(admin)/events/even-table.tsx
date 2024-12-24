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
import useGetEvents from "@/hooks/api/events/useGetEvents";
import { useToast } from "@/hooks/use-toast";
import { QueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Button } from "@/components/ui/button";


interface Event {
  data: [
    {
      id: any;
      title: string;
      location: string;
      date: any;
      displayType: boolean;
      eventType: string;
      startTime1: string;
      startTime2?: string;
      endTime1: string;
      endTime2?: string;
      startDate: string;
      endDate?: any;
    }
  ];
  onDelete: (id: string) => void;
}

const ErrorHandle: React.FC = () => (
  <TableRow>
    <TableCell colSpan={6} className="text-center">
      Unexpected Error Occurred
    </TableCell>
  </TableRow>
);

const HandleLoading: React.FC = () => (
  <TableRow>
    <TableCell colSpan={6} className="text-center">
      Loading...
    </TableCell>
  </TableRow>
);

const ZeroDataTable: React.FC = () => (
  <TableRow>
    <TableCell colSpan={6} className="text-center">
      No Data Found
    </TableCell>
  </TableRow>
);

const TableView = ({ data, onDelete }: Event) => {
  return (
    <>
      {data.map((event, i) => (
        <TableRow key={event.id || i}>
          <TableCell>{i + 1}</TableCell>
          <TableCell>{event.title}</TableCell>
          <TableCell>
            {event.eventType === "SINGLE" ? (
              `${new Date(event.startDate).toLocaleDateString()} [${event.startTime1
              }-${event.endTime1}]`
            ) : (
              <span>
                {new Date(event.startDate).toLocaleDateString()} [
                {event.startTime1}-{event.endTime1}] <br />
                {new Date(event.endDate).toLocaleDateString()} [
                {event.startTime2}-{event.endTime2}]
              </span>
            )}
          </TableCell>
          <TableCell>{event.location}</TableCell>

          <TableCell>
            <div className="flex space-x-2">
              <Button
                variant="link"
                onClick={() => console.log(`Edit event with ID: ${event.id}`)}
              >
                Edit
              </Button>
              <Button variant="destructive" onClick={() => onDelete(event.id)}>
                Delete
              </Button>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};



const EventTable: React.FC = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [deleteId, setDeleteId] = useState<string>("");
  const events = useGetEvents();
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
        <TableBody>
          {events.isError ? (
            <ErrorHandle />
          ) : events.isLoading ? (
            <HandleLoading />
          ) : events.data && events.data.length === 0 ? (
            <ZeroDataTable />
          ) : (
            events.data && <TableView
              data={events.data}
              onDelete={handleDeleteEvent}
            />)
          }
        </TableBody>
      </Table>
    </Card>
  )
}


export default EventTable;