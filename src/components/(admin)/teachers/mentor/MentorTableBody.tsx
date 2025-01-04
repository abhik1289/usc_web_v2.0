import { TableBody, TableCell, TableRow } from '@/components/ui/table'
import React from 'react'
import Image from 'next/image'
import useGetMentor from '@/hooks/api/mentor/useGetMentor'
import { Button } from '@/components/ui/button'


interface MentorTableBodyProps {
    id: string;
    onDelete: (id: string) => void;
    onEdit: (id: string) => void;
    school: string;
    fullName: string;
    customPosition: string;
    imageUrl: string;
    role: string;
    index: number;
}

function MentorTableBody({ id, onDelete, onEdit, school, fullName, customPosition, imageUrl, role, index }: MentorTableBodyProps) {

 

    return (
        <TableBody>

            <TableRow key={id}>
                <TableCell>{index}</TableCell>
                <TableCell>{fullName}</TableCell>
                <TableCell>{school}</TableCell>
                <TableCell>{role}</TableCell>
                <TableCell>{customPosition}</TableCell>
                <TableCell>
                    <Image src={imageUrl} alt={fullName} width={50} height={50} />
                </TableCell>
                <TableCell>
                    <div className="flex space-x-3">
                        <Button
                            variant="link"
                            onClick={() => onEdit(id)}
                        >
                            Edit
                        </Button>
                        <Button
                            variant="link"
                            className="text-red-500"
                            onClick={() => onDelete(id)}
                        >
                            Delete
                        </Button>
                    </div>
                </TableCell>
            </TableRow>


        </TableBody>
    )
}

export default MentorTableBody;




// {
//     mentor.isError ? <TableRow><TableCell colSpan={6}>Error</TableCell></TableRow> :
//         mentor.isLoading ? <TableRow><TableCell colSpan={6}>Loading...</TableCell></TableRow> : mentor.data.length === 0 ? <TableRow><TableCell colSpan={6}>No data</TableCell></TableRow> :
//             mentor.data?.map((data: any, i: number) => (
// ))}