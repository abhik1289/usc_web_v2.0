import React from 'react'
import { CardContent } from '@/components/ui/card'
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from '@/components/ui/table'
import MentorBody from './MentorBody';
function MentorTable() {


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
                <MentorBody/>
            </Table>
        </CardContent>
    )
}

export default MentorTable