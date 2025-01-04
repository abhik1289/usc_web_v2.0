import useGetMentor from '@/hooks/api/mentor/useGetMentor';
import React from 'react'
import MentorTableBodyContent from './MentorTableBodyContent';
import { TableCell, TableRow } from '@/components/ui/table';


function MentorBody() {

    const { data: MentorData, isLoading, isError } = useGetMentor();
    const handleEdit = (id: string) => { }
    const handleDelete = (id: string) => { }


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

        </>
    )
}

export default MentorBody