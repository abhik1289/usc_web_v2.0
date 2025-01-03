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
}

function AdvisorTableBodyContent({ i, fullName, school, profilePhoto, id }: AdvisorTableBodyContentProps) {
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
                <Button className="bg-blue-500 text-white px-4 py-2 rounded-md">Edit</Button>
                <Button className="bg-red-500 text-white px-4 py-2 rounded-md">Delete</Button>
            </TableCell>
        </TableRow>
    )
}

export default AdvisorTableBodyContent