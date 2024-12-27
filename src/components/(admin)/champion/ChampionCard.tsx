import { Card, CardFooter } from '@/components/ui/card'
import React from 'react'
import Image from 'next/image';
import AlertDialogBox from '../AlertDialog.tsx/AlertDialog';
import useDeleteChampion from '@/hooks/api/champions/useDeleteChampion';


export interface CahmpionCardInterface {
    profilePhoto: string;
    fullName: string;
    role: {
        title: string;
    };
    coverPhoto: string;
    description: string;
    id: string;
}

export default function ChampionCard({ coverPhoto, fullName, role, profilePhoto, description, id }: CahmpionCardInterface) {

    const [showDialog, setShowDialog] = React.useState(false);
    const [deleteId, setDeleteId] = React.useState<string>("");
    const deleteMutation = useDeleteChampion(deleteId);
    const onDelete = () => {
        setShowDialog(true);
        setDeleteId(id);
    };
    const onConfirm = () => {
        if (deleteId) {
            deleteMutation.mutate(deleteId);
        }
    };

    return (
        <Card className='flex flex-wrap my-2 items-center gap-3'>
            <div className='w-4/12'>
                <Image src={coverPhoto} width={100} height={100} alt={fullName} className='w-full' />
            </div>
            <div className="w-7/12 py-2">
                <div className="champion_text">
                    {description}
                </div>
                <div className="chmapion_description py-2 flex flex-wrap gap-2 items-center">
                    <div className="profile_photo">
                        <Image src={profilePhoto} width={100} height={100} alt={fullName} className='w-[40px] h-[40px] rounded-full' />
                    </div>
                    <div className="text">
                        <h1 className='text-xl font-bold'>{fullName}</h1>
                        <p className='text-sm text-gray-500'>{role.title}</p>
                    </div>
                </div>
            </div>
            <CardFooter className='w-full border border-t flex items-center pt-4 border-b-0 border-l-0 border-r-0'>
                <div className=" w-full flex gap-4 justify-center">
                    <button className='btn text-blue-400 hover:text-blue-600 transition-all duration-200' >Edit</button>
                    <button onClick={onDelete} className='btn text-red-500 hover:text-purple-600 transition-all duration-200'>Delete</button>
                </div>
            </CardFooter>
            <AlertDialogBox title='Delete Champion' description='Are you sure you want to delete the Champion and its description?' show={showDialog} setShow={() => setShowDialog(false)} onConfirm={onConfirm} />
        </Card >
    )
}
