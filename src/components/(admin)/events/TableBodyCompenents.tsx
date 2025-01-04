import { Button } from "@/components/ui/button";
import {
    TableCell,
    TableRow,
} from "@/components/ui/table";
import Image from "next/image";
interface Event {
    data: any
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
            {data.map((event: any, i: number) => (
                <TableRow key={event.id || i}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{event.title}</TableCell>
                    <TableCell>
                        {event.eventType === "SINGLE" ? (
                            `${new Date(event.startDate).toLocaleDateString()} [${event.startTime1
                            }-${event.endTime1}]`
                        ) : (
                            <span>

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
                                onClick={() => console.log(`Edit event with ID: ${event.id}`)}
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
