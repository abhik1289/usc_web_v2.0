import { Button } from '@/components/ui/button'
import React from 'react'

function AdvisorHeader() {
    return (
        <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Mentor & Advisor</h1>
            <Button >Add Member</Button>
        </div>
    )
}

export default AdvisorHeader