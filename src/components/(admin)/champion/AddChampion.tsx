import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import AddChampionForm from './AddChampionForm'

function AddChampion() {
    return (
        <div className='p-4'>
            <Card>
                <CardHeader>
                    <CardTitle>Add Champion</CardTitle>
                    <CardDescription>Fill the form below to add a new champion</CardDescription>
                </CardHeader>
                <AddChampionForm />
            </Card>
        </div>
    )
}

export default AddChampion