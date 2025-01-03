import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import useGetAdvisor from '@/hooks/api/mentor/useGetAdvisor';
import React from 'react'
import Image from 'next/image';
function AdvisorBox() {
    const advisors = useGetAdvisor();
    console.log(advisors.data)
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

                        {
                            advisors.data?.map((advisor: any, i: number) => (
                                <TableRow key={i}>
                                    <TableCell>{i + 1}</TableCell>
                                    <TableCell>{advisor.fullName}</TableCell>
                                    <TableCell>{advisor.school}</TableCell>
                                    <TableCell>
                                        <div className="img_container rounded-md overflow-hidden w-[50px] h-[50px]">
                                            <Image src={advisor.profilePhoto} width={100} height={100} alt='' />
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Edit</button>
                                        <button className="bg-red-500 text-white px-4 py-2 rounded-md">Delete</button>
                                    </TableCell>
                                </TableRow>
                            ))
                        }

                    </TableBody>
                </Table>
            </CardContent>
        </Card >
    )
}

export default AdvisorBox