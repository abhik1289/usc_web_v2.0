import React, { useState } from 'react'
import useGetMentor from '@/hooks/api/mentor/useGetMentor';
import MentorTableBodyContent from './MentorTableBodyContent';
import { TableCell, TableRow } from '@/components/ui/table';
import AlertDialogBox from '../../AlertDialog.tsx/AlertDialog';


function MentorBody() {


    const [show, setShow] = useState(false);
    const [id, setId] = useState('');
    const { data: MentorData, isLoading, isError } = useGetMentor();
    const handleEdit = (id: string) => { }
    const handleDelete = (id: string) => { }
    const hanndleConfirmDelete = () => { }

    if (isError) {
        return <TableRow>
            <TableCell className='text-red-400' colSpan={7}>Error</TableCell>
        </TableRow>
    }
    if (isLoading) {
        return <TableRow>
            <TableCell className='text-center' colSpan={7}>
                Loading...
            </TableCell>
        </TableRow>
    }
    if (MentorData && MentorData.length === 0) {
        return <TableRow><TableCell className='text-center' colSpan={7}>No data</TableCell></TableRow>
    }

    return (
        <>
            {

                MentorData && MentorData.map((mentor: any, i: number) => <MentorTableBodyContent
                    index={i + 1}
                    key={mentor.id}
                    id={mentor.id}
                    fullName={mentor.fullName}
                    school={mentor.school}
                    role={mentor?.Roles?.title}
                    customPosition={mentor.customPosition!}
                    imageUrl={mentor.profilePhoto}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                />)
            }
            <AlertDialogBox
                title="Delete Mentor"
                description="Are you sure you want to delete this mentor? This action cannot be undone."
            
                show={show}
                setShow={() => setShow(false)}
                onConfirm={hanndleConfirmDelete}
            />
        </>
    )
}

export default MentorBody