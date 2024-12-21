import { Card, CardFooter } from '@/components/ui/card'
import React from 'react'
import Image from 'next/image';


export interface CahmpionCardInterface {
    bannerUrl: string;
    name: string;
    role: string;
    profilePhotoUrl: string;
    description: string;
}

export default function ChampionCard({ bannerUrl, name, role, profilePhotoUrl, description }: CahmpionCardInterface) {
    return (
        <Card className='flex flex-wrap my-2 items-center gap-3'>
            <div className='w-4/12'>
                <Image src={bannerUrl} width={100} height={100} alt={name} className='w-full' />
            </div>
            <div className="w-7/12 py-2">
                <div className="champion_text">
                    {description}
                </div>
                <div className="chmapion_description py-2 flex flex-wrap gap-2 items-center">
                    <div className="profile_photo">
                        <img src={profilePhotoUrl} width={100} height={100} alt={name} className='w-[40px] h-[40px] rounded-full' />
                    </div>
                    <div className="text">
                        <h1 className='text-xl font-bold'>{name}</h1>
                        <p className='text-sm text-gray-500'>{role}</p>
                    </div>
                </div>
            </div>
            <CardFooter className='w-full border border-t flex items-center pt-4 border-b-0 border-l-0 border-r-0'>
                <div className=" w-full flex gap-4 justify-center">
                    <button className='btn text-blue-400 hover:text-blue-600 transition-all duration-200' >Edit</button>
                    <button className='btn text-red-500 hover:text-purple-600 transition-all duration-200'>Delete</button>
                </div>
            </CardFooter>
        </Card >
    )
}
