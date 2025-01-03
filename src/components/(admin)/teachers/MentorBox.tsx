import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import MentorTable from './mentor/MentorTable'

function MentorBox() {
    return (
        <Card>
            <CardHeader>
                <CardTitle> Mentot</CardTitle>
                <CardDescription>
                    This is the mentor table
                </CardDescription>
            </CardHeader>
            <MentorTable/>
        </Card>
    )
}

export default MentorBox