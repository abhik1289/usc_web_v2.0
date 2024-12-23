"use client";
import React, { useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useGetLeads } from "@/hooks/api/leads/useGetLeads";
import AlertDialogBox from '../AlertDialog.tsx/AlertDialog';
import useDeleteLead from '@/hooks/api/leads/useDeleteLead';
function LeadsTable() {

    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [deleteId, setDeleteId] = useState<string | null>();
    const leadsInfo = useGetLeads();
    const leads = leadsInfo.data;
    const router = useRouter();
    const deleteLead = useDeleteLead();

    const handleDelte = (id: string) => {
        setShowDialog(true);
        setDeleteId(id);
    }
    const handleDeleteConfirm = () => {
        if (deleteId) {
            deleteLead.mutate({ id: deleteId });
            setDeleteId(null);
            setShowDialog(false);
        }
    }

    return (
        <div className="p-6 space-y-6">


            <div className="rounded-lg shadow-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Domain Name</TableCell>
                            <TableCell>Socials</TableCell>
                            <TableCell>Core Member</TableCell>
                            <TableCell>Profile Photo</TableCell>
                            <TableCell>Photo</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {leadsInfo.isError ? (
                            <TableRow>
                                <TableCell className='text-center' colSpan={8}>
                                    Error while fetching data
                                </TableCell>
                            </TableRow>
                        ) : leadsInfo.isLoading ? (
                            <TableRow>
                                <TableCell className="text-center" colSpan={8}>
                                    Loading...
                                </TableCell>
                            </TableRow>
                        ) : leads.length === 0 ? (
                            <TableRow>
                                <TableCell className='text-center' colSpan={8}>
                                    No Record Found
                                </TableCell>
                            </TableRow>
                        ) : (
                            leads.map((lead: any, i: number) => (
                                <TableRow key={lead.id}>
                                    <TableCell>{i + 1}</TableCell>
                                    <TableCell>{`${lead.fullName?.split(" ")[0]}${lead.isCurrent === false ? " (F)" : ""}`}</TableCell>
                                    <TableCell>{lead.domainName.title}</TableCell>
                                    <TableCell>Avik</TableCell>
                                    <TableCell>Avik</TableCell>
                                    <TableCell>
                                        {lead.isCoreMember ? lead.coreMemberPosition.title : 'No'}
                                    </TableCell>
                                    <TableCell>
                                        {lead.profilePhoto && (
                                            <Image
                                                width={100}
                                                height={100}
                                                src={lead.profilePhoto}
                                                alt={lead.id}
                                                className="h-16 w-16 object-cover rounded"
                                            />
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex space-x-3">
                                            <Button
                                                variant="link"
                                                onClick={() => router.push(`/leads/add-lead?id=${lead.id}`)}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="link"
                                                className="text-red-500"
                                                onClick={() => handleDelte(lead.id)}
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
                <AlertDialogBox
                    title='Confirm Lead Deletion'
                    description='Are you sure you want to delete this lead? This action cannot be undone and will permanently remove all associated data, including their social links and profile details.'
                    show={showDialog}
                    onConfirm={handleDeleteConfirm}
                    setShow={() => setShowDialog(false)}
                />
            </div>
        </div>
    )
}

export default LeadsTable