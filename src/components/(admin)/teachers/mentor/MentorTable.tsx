import { CardContent } from '@/components/ui/card'
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from '@/components/ui/table'
import useGetMentor from '@/hooks/api/mentor/useGetMentor'
import React from 'react'
import Image from 'next/image'
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
                    {
                        mentor.isError ? <TableRow><TableCell colSpan={6}>Error</TableCell></TableRow> :
                            mentor.isLoading ? <TableRow><TableCell colSpan={6}>Loading...</TableCell></TableRow> : mentor.data.length === 0 ? <TableRow><TableCell colSpan={6}>No data</TableCell></TableRow> :
                                mentor.data?.map((data: any, i: number) => (
                                    <TableRow key={data.id}>
                                        <TableCell>{i + 1}</TableCell>
                                        <TableCell>{data.fullName}</TableCell>
                                        <TableCell>{data.school}</TableCell>
                                        <TableCell>{data.Roles.title}</TableCell>
                                        <TableCell>{data.customPosition}</TableCell>
                                        <TableCell>
                                            <Image src={data.
profilePhoto} alt={data.fullName} width={50} height={50} />
                                        </TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                ))}

                </TableBody>
            </Table>
        </CardContent>
    )
}

export default MentorTable