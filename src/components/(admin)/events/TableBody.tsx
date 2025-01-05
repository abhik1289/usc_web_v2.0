import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TableBody } from '@/components/ui/table';
import useGetEvents from '@/hooks/api/events/useGetEvents';
import { ErrorHandle, HandleLoading, TableView, ZeroDataTable } from './TableBodyCompenents';
import EventChangeVisibility from "./EventChangeVisibility";
interface TableBodyBoxProps {
    handleDeleteEvent: (id: string) => void;
}




const TableBodyBox: React.FC<TableBodyBoxProps> = ({ handleDeleteEvent }: TableBodyBoxProps) => {


    const [showDialog, setShowDialog] = useState(false);
    const [Id, setId] = useState<string>("");

    const events = useGetEvents();
    const router = useRouter();

    const handleEdit = (id: string) => {
        router.push(`/events/add?id=${id}`)
    }
    const handleVisibility = (id: string) => {
        setShowDialog(true);
        // setDeleteId(id);
    }


    return <>
        <TableBody>
            {events.isError ? (
                <ErrorHandle />
            ) : events.isLoading ? (
                <HandleLoading />
            ) : events.data && events.data.length === 0 ? (
                <ZeroDataTable />
            ) : (
                events.data && <TableView
                    onEdit={handleEdit}
                    data={events.data}
                    onDelete={handleDeleteEvent}
                    onVisibility={handleVisibility}
                />)
            }
        </TableBody>
        <EventChangeVisibility
            open={showDialog}
            setOpen={setShowDialog}
        />
    </>
};

export default TableBodyBox;
