"use client"
import { Button } from '@/components/ui/button'
import React from 'react'
import { useRouter } from 'next/navigation'

function AdvisorHeader() {
    const router = useRouter()
    return (
        <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Mentor & Advisor</h1>
            <Button onClick={()=>router.push("/teachers/add")} >Add Member</Button>
        </div>
    )
}

export default AdvisorHeader