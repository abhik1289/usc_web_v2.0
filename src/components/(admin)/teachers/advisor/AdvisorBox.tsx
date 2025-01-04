import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import React from 'react'
import AdvisoryTableBody from './AdvisoryTableBody';
function AdvisorBox() {

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Advisor
                </CardTitle>
                <CardDescription>
                    This is the advisor table
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="">Id</TableHead>
                            <TableHead>Fullname</TableHead>
                            <TableHead>School</TableHead>
                            <TableHead>Photo</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <AdvisoryTableBody />
                    </TableBody>
                </Table>
            </CardContent>
        </Card >
    )
}

export default AdvisorBox