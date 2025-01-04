import { CardContent } from '@/components/ui/card'
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from '@/components/ui/table'
import useGetMentor from '@/hooks/api/mentor/useGetMentor'
import React from 'react'

function MentorTable() {

    const mentor = useGetMentor()
    console.log(mentor.data)
    return (
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="">Id</TableHead>
                        <TableHead>Fullname</TableHead>
                        <TableHead>School</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Additional Information</TableHead>
                        <TableHead>Photo</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {mentor.data?.map((data: any) => (
                        <TableRow key={data.id}>
                            <TableCell>{data.id}</TableCell>
                            <TableCell>{data.fullname}</TableCell>
                            <TableCell>{data.school}</TableCell>
                            <TableCell>{data.role}</TableCell>
                            <TableCell>{data.additional_information}</TableCell>
                            <TableCell>{data.photo}</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    ))}

                </TableBody>
            </Table>
        </CardContent>
    )
}

export default MentorTable