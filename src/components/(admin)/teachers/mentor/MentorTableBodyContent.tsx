import { TableBody, TableCell, TableRow } from '@/components/ui/table'
import React from 'react'
import Image from 'next/image'
import useGetMentor from '@/hooks/api/mentor/useGetMentor'
import { Button } from '@/components/ui/button'


interface MentorTableBodyContentProps {
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

function MentorTableBodyContent({ id, onDelete, onEdit, school, fullName, customPosition, imageUrl, role, index }: MentorTableBodyContentProps) {

 

    return (
      

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



    )
}

export default MentorTableBodyContent;




