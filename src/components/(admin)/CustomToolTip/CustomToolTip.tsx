import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import React from 'react'

export default function CustomToolTip({ content, elment }: { content: string, elment: any }) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipContent>
                    <p> {content}</p>
                </TooltipContent>
                <TooltipTrigger asChild>
                    {
                        elment
                    }
                </TooltipTrigger>
            </Tooltip>
        </TooltipProvider>
    )
}
