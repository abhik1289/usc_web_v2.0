import { Button } from "@/components/ui/button";
import {
    TableCell,
    TableRow,
} from "@/components/ui/table";
import Image from "next/image";
interface Event {
    data: any
    onDelete: (id: string) => void;
    onEdit: (id: string) => void;
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

export const TableView = ({ data, onDelete, onEdit }: Event) => {
    return (
        <>
            {data.map((event: any, i: number) => (
                <TableRow key={event.id || i}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{event.title}</TableCell>
                    <TableCell>
                        {event.eventType === "SINGLE" ? (
                            `${new Date(event.eventDateSingle.startDate).toLocaleDateString()} [${event.eventDateSingle.startTime
                            }-${event.eventDateSingle.endTime}]`
                        ) : (
                            <span>
                                {
                                    console.log(event.eventDateMultitle.startTime1)
                                }
                                {new Date(event.eventDateMultitle.startDate1).toLocaleDateString()} [
                                {event.eventDateMultitle.startTime1}-{event.eventDateMultitle.endTime1}] <br />
                                {new Date(event.eventDateMultitle.startDate2).toLocaleDateString()} [
                                {event.eventDateMultitle.startTime2}-{event.eventDateMultitle.endTime2}]
                            </span>
                        )}
                    </TableCell>
                    <TableCell>{event.location}</TableCell>
                    <TableCell>
                        <Image src={event.banner_url} width={100} height={100} alt={event.title} />
                    </TableCell>
                    <TableCell>
                        <div className="flex space-x-2">
                            <Button
                                variant="link"
                                onClick={() => onEdit(event.id)}
                            >
                                Edit
                            </Button>
                            <Button variant="link" className="text-red-400" onClick={() => onDelete(event.id)}>
                                Delete
                            </Button>
                        </div>
                    </TableCell>
                </TableRow>
            ))}
        </>
    );
};
