import React, { useState } from 'react'
// import TableBody from '../events/TableBody'
import { TableCell, TableRow, TableBody } from '@/components/ui/table'
import AdvisorTableBodyContent from './AdvisorTableBodyContent'
import useGetAdvisor from '@/hooks/api/mentor/useGetAdvisor';
import AlertDialogBox from '../AlertDialog.tsx/AlertDialog';

function AdvisoryTableBody() {


    const [showModal, setShowModal] = useState<boolean>(false);
    const [deleteId, setDeleteId] = useState<string>('');


    const advisors = useGetAdvisor();

    const onDelete = (id: string) => {
        setShowModal(true);
        setDeleteId(id);
    }

    const handleDelteConfirm = () => {
        if (deleteId) {
            console.log(deleteId);
            // deleteEvent.mutate(deleteId);
        }
    }

    return (
        <TableBody>

            {
                advisors.isError ? <TableRow>
                    <TableCell colSpan={5}>Error fetching data</TableCell>
                </TableRow> :
                    advisors.isLoading ? <TableRow>
                        <TableCell colSpan={5}>Loading...</TableCell>
                    </TableRow> : advisors.data?.length === 0 ? <TableRow>
                        <TableCell colSpan={5}>No data available</TableCell>
                    </TableRow>
                        :
                        advisors.data?.map((advisor: any, i: number) => <AdvisorTableBodyContent
                            key={i}
                            i={i}
                            fullName={advisor.fullName}
                            school={advisor.school}
                            profilePhoto={advisor.profilePhoto}
                            id={advisor.id}
                            onDelete={onDelete}
                        />)
            }
            <AlertDialogBox
                title="Delete Mentor"
                description="Are you sure you want to delete this mentor? This action cannot be undone."
                show={showModal}
                setShow={() => setShowModal(false)}
                onConfirm={handleDelteConfirm}
            />
        </TableBody>
    )
}

export default AdvisoryTableBody