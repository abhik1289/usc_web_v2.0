import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

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

export const ErrorHandle: React.FC = () => (
    <TableRow>
        <TableCell colSpan={6} className="text-center">
            Unexpected Error Occurred
        </TableCell>
    </TableRow>
);

export const HandleLoading: React.FC = () => (
    <TableRow>
        <TableCell colSpan={6} className="text-center">
            Loading...
        </TableCell>
    </TableRow>
);

export const ZeroDataTable: React.FC = () => (
    <TableRow>
        <TableCell colSpan={6} className="text-center">
            No Data Found
        </TableCell>
    </TableRow>
);

export const TableView = ({ data, onDelete }: Event) => {
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
