import React from 'react';

import { TableBody } from '@/components/ui/table';
import useGetEvents from '@/hooks/api/events/useGetEvents';
import { ErrorHandle, HandleLoading, TableView, ZeroDataTable } from './TableBodyCompenents';

interface TableBodyBoxProps {
    handleDeleteEvent: (id: string) => void;
}

const TableBodyBox: React.FC<TableBodyBoxProps> = ({ handleDeleteEvent }: TableBodyBoxProps) => {
    const events = useGetEvents();
    return <TableBody>
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
};

export default TableBodyBox;
