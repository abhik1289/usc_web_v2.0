import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import useGetAdvisor from '@/hooks/api/mentor/useGetAdvisor';
import React from 'react'
import AdvisorTableBodyContent from './AdvisorTableBodyContent';
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
                    <AdvisoryTableBody />
                </Table>
            </CardContent>
        </Card >
    )
}

export default AdvisorBox