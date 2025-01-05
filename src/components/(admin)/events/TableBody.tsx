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


   

    const events = useGetEvents();
    const router = useRouter();

    const handleEdit = (id: string) => {
        router.push(`/events/add?id=${id}`)
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
              
                />)
            }
        </TableBody>
       
    </>
};

export default TableBodyBox;
