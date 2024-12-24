import { Button } from '@/components/ui/button'
import React from 'react'

function EventHeader() {
    return (
        <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Events</h1>
            <Button>
                Add Event
            </Button>
        </div>
    )
}

export default EventHeader