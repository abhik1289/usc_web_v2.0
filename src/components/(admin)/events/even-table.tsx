import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { QueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import useGetEvents from "@/hooks/api/events/useGetEvents";
import { useState } from "react";
import AlertDialogBox from "../AlertDialog.tsx/AlertDialog";



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
  onVisibility: (id: string) => void;
}

const ErrorHandle = () => (
  <TableRow>
    <TableCell colSpan={6} className="text-center">
      Unexpected Error Occurred
    </TableCell>
  </TableRow>
);

const HandleLoading = () => (
  <TableRow>
    <TableCell colSpan={6} className="text-center">
      Loading...
    </TableCell>
  </TableRow>
);

const ZeroDataTable = () => (
  <TableRow>
    <TableCell colSpan={6} className="text-center">
      No Data Found
    </TableCell>
  </TableRow>
);

const TableView = ({ data, onDelete, onVisibility }: Event) => {
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
            {!event.displayType ? (
              <FaRegEye
                onClick={() => onVisibility(event.id)}
                className="cursor-pointer"
              />
            ) : (
              <FaRegEyeSlash
                onClick={() => onVisibility(event.id)}
                className="cursor-pointer"
              />
            )}
          </TableCell>
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

const EventTable = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [deleteId, setDeleteId] = useState<string>("");
  const events = useGetEvents();
  const { toast } = useToast();
  const queryClient = new QueryClient();
console.log(events.data)
  const deleteMutation = useMutation({
    mutationFn: (id: string) => axios.get(`/api/event/delete-event/${id}`), // Use DELETE method
    onMutate: async (id) => {
      await queryClient.cancelQueries(["events"]); // Cancel any outgoing refetches

      const previousEvents = queryClient.getQueryData<Event>(["events"]); // Get current events

      // Optimistically update the cache by removing the deleted event
      if (previousEvents) {
        queryClient.setQueryData<any>(["events"], {
          data: previousEvents.data.filter((event) => event.id !== id),
        });
      }

      return { previousEvents }; // Return context for rollback
    },
    onError: (err, id, context) => {
      // Rollback to previous state in case of error
      if (context?.previousEvents) {
        queryClient.setQueryData<Event>(["events"], context.previousEvents);
      }
    },
    onSuccess: () => {
      toast({
        description: "Deleted event",
        variant: "destructive",
      });
      // refetch(); // Refetch to ensure data is fresh after deletion
    },
  });

  const visibilityMutation = useMutation({
    mutationFn: (id: string) => axios.get(`/api/event/change-view/${id}`),
    onMutate: async (id: string) => {
      await queryClient.cancelQueries(["events"]);
      const previousEvents = queryClient.getQueryData<Event>(["events"]);
      if (previousEvents) {
        queryClient.setQueryData<any>(["events"], {
          data: previousEvents.data.filter((event: any) =>
            event.id === id
              ? {
                ...event,
                displayType:
                  event.displayType == "PRIVATE" ? "PUBLIC" : "PRIVATE",
              }
              : event
          ),
        });
      }
      return { previousEvents }; // Return context for rollback
    },
    onError: (err, id, context) => {
      // Rollback to previous state in case of error
      if (context?.previousEvents) {
        queryClient.setQueryData<Event>(["events"], context.previousEvents);
      }
    },
    onSuccess: () => {
      toast({
        description: "Change Visibility",
        // variant: "destructive",
      });
      // refetch(); // Refetch to ensure data is fresh after deletion
    },
  });

  const handleDeleteEvent = (id: string) => {
    setShowDialog(true);
    setDeleteId(id);
  };

  const handleVisibility = (id: string) => {
    visibilityMutation.mutate(id);
  };
  const handleConfirmDelete = () => {
    if (deleteId) {
      deleteMutation.mutate(deleteId);
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
              <TableHead>Visibility</TableHead>
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
              <TableView
                data={events.data}
                onVisibility={handleVisibility}
                onDelete={handleDeleteEvent}
              />
            )}
          </TableBody>
        </Table>
        <AlertDialogBox show={showDialog} setShow={() => setShowDialog(false)} title=" Delete Confirmation" description="Are you sure you want to delete this item? This action cannot be undone. Please confirm to proceed or cancel to keep the item." onConfirm={handleConfirmDelete} />
      </Card>
    );
  }
};

export default EventTable;
