import { CardContent } from '@/components/ui/card'
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from '@/components/ui/table'
import useGetMentor from '@/hooks/api/mentor/useGetMentor'
import React from 'react'
import Image from 'next/image'
import MentorTableBody from './MentorTableBody'
import { Teachers } from '@prisma/client'
function MentorTable() {

    const { data: MentorData, isLoading } = useGetMentor();
    const handleEdit = (id: string) => { }
    const handleDelete = (id: string) => { }

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
                {MentorData && MentorData.map((mentor: any, i: number) => <MentorTableBody
                    index={i}
                    key={mentor.id}
                    id={mentor.id}
                    fullName={mentor.fullName}
                    school={mentor.school}
                    role={mentor.Roles.title}
                    customPosition={mentor.customPosition!}
                    imageUrl={mentor.profilePhoto}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                />)}
            </Table>
        </CardContent>
    )
}

export default MentorTable