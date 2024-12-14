import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import useSWR from "swr";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
const fetcher = async (url: string) => {
  const response = await axios.get(url);
  return response.data.events;
};

const ErrorHandle = () => {
  return (
    <TableRow>
      <TableCell colSpan={5} className="text-center">
        Unexpected Error Occurred
      </TableCell>
    </TableRow>
  );
};

const HandleLoading = () => {
  return (
    <TableRow>
      <TableCell colSpan={5} className="text-center">
        Loading...
      </TableCell>
    </TableRow>
  );
};

const ZeroDataTable = () => {
  return (
    <TableRow>
      <TableCell colSpan={5} className="text-center">
        No Data Found
      </TableCell>
    </TableRow>
  );
};

interface Event {
  data: [
    {
      id: number;
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
}

const TableView = ({ data }: Event) => {
  const handleDeleteEvent = (id: number) => {
    // setEvents(events.filter((event) => event.id !== id));
  };
  return (
    <>
      {data &&
        data.map((event: any, i: number) => (
          <TableRow key={i}>
            <TableCell>{i + 1}</TableCell>
            <TableCell>{event.title}</TableCell>
            <TableCell>
              {event.eventType == "SINGLE" ? (
                `${new Date(event.startDate).toLocaleDateString()} [${
                  event.startTime1
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
                <FaRegEye className="cursor-pointer" />
              ) : (
                <FaRegEyeSlash className="cursor-pointer" />
              )}
            </TableCell>

            <TableCell>
              <div className="flex space-x-2">
                <Button
                  variant="link"
                  onClick={() => {
                    // setEditingEvent(event);
                    // setIsDialogOpen(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteEvent(event.id)}
                >
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
  const { data, error, isLoading } = useSWR("/api/event/all-events", fetcher);
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
          {error && <ErrorHandle />}
          {isLoading ? (
            <HandleLoading />
          ) : data.length == 0 ? (
            <ZeroDataTable />
          ) : (
            <TableView data={data} />
          )}
        </TableBody>
      </Table>
    </Card>
  );
};

export default EventTable;
