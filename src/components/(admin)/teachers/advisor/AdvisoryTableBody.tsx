"use client";
import React, { useState } from 'react'
import { TableCell, TableRow, TableBody } from '@/components/ui/table'
import AdvisorTableBodyContent from './AdvisorTableBodyContent'
import useGetAdvisor from '@/hooks/api/mentor/useGetAdvisor';
import AlertDialogBox from '../../AlertDialog.tsx/AlertDialog';
import useDeleteTeacher from '@/hooks/api/mentor/useDeleteTeacher';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
function AdvisoryTableBody() {


    const [showModal, setShowModal] = useState<boolean>(false);
    const [deleteId, setDeleteId] = useState<string>('');


    const advisors = useGetAdvisor();
    const router = useRouter();
    const deletTeacher = useDeleteTeacher({ mType: "advisor" });
    const onDelete = (id: string) => {
        setShowModal(true);
        setDeleteId(id);
    }

    const handleDelteConfirm = () => {
        if (deleteId) {
            deletTeacher.mutate({ id: deleteId }, {
                onSuccess: () => {
                    setShowModal(false);
                    toast({
                        description: "Mentor deleted successfully!",
                    });
                }
            });
        }
    }
    const handleEdit = (id: string) => {
        router.push(`/teachers/add?id=${id}`)
    }


    if (advisors.isError) {
        return <TableRow>
            <TableCell className='text-red-500' colSpan={5}>Error fetching data</TableCell>
        </TableRow>
    }
    if (advisors.isLoading) {
        return <TableRow>
            <TableCell className='text-center' colSpan={5}>Loading...</TableCell> </TableRow>
    }
    if (advisors.data?.length === 0) {
        return <TableRow>
            <TableCell className='text-center' colSpan={5}>No data</TableCell>
        </TableRow>
    }

    return (

        <>{
            advisors.data?.map((advisor: any, i: number) => <AdvisorTableBodyContent
                onEdit={handleEdit}
                key={i}
                i={i}
                fullName={advisor.fullName}
                school={advisor.school}
                profilePhoto={advisor.profilePhoto}
                id={advisor.id}
                onDelete={onDelete}
            />)
        }
            < AlertDialogBox
                title="Delete Advisor"
                description="Are you sure you want to delete this advisor? This action cannot be undone."
                show={showModal}
                setShow={() => setShowModal(false)
                }
                onConfirm={handleDelteConfirm}
            /></>

    )
}

export default AdvisoryTableBody