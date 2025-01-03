import { CardContent } from '@/components/ui/card'
import { Table, TableHeader, TableHead, TableRow, TableBody } from '@/components/ui/table'
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
                    {/* {
                        mentor.isError ? <TableRow>
                            <TableHead colSpan={7}>Error fetching data</TableHead>
                        </TableRow> :
                            mentor.isLoading ? <TableRow>
                                <TableHead colSpan={7}>Loading...</TableHead>
                            </TableRow> : mentor.data?.length === 0 ? <TableRow>
                                <TableHead colSpan={7}>No data available</TableHead>
                            </TableRow>
} */}
                                {/* // mentor.data?.map((mentor: any, i: number) => <TableRow key={i}>
                                //     <TableHead>{mentor.id}</TableHead>
                                //     <TableHead>{mentor.fullName}</TableHead>
                                //     <TableHead>{mentor.school}</TableHead>
                                //     <TableHead>{mentor.role}</TableHead>
                                //     <TableHead>{mentor.additionalInformation}</TableHead>
                                //     <TableHead>{mentor.profilePhoto}</TableHead>
                                //     <TableHead>Action</TableHead>
                                // </TableRow>)
                 } */}
                </TableBody>
            </Table>
        </CardContent>
    )
}

export default MentorTable