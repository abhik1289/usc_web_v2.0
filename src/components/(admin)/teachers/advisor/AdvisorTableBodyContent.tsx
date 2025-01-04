import { TableCell, TableRow } from '@/components/ui/table';
import React from 'react'
import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface AdvisorTableBodyContentProps {
    i: number;
    fullName: string;
    school: string;
    profilePhoto: string;
    id: string;
    onDelete: (id: string) => void;
    onEdit: (id: string) => void;
}

function AdvisorTableBodyContent({ i, fullName, school, profilePhoto, id, onDelete,onEdit }: AdvisorTableBodyContentProps) {
    return (
        <TableRow key={i}>
            <TableCell>{i + 1}</TableCell>
            <TableCell>{fullName}</TableCell>
            <TableCell>{school}</TableCell>
            <TableCell>
                <div className="img_container rounded-md overflow-hidden w-[50px] h-[50px]">
                    <Image src={profilePhoto} width={100} height={100} alt='' />
                </div>
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

export default AdvisorTableBodyContent