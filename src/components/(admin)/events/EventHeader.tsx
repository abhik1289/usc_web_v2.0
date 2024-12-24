"use client";
import React from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation';
function EventHeader() {
    const router = useRouter();
    return (
        <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Events</h1>
            <Button  onClick={()=>router.push("/events/add")} >
                Add Event
            </Button>
        </div>
    )
}

export default EventHeader