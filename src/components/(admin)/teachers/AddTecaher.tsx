import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import AddForm from './AddForm'

function AddTeacher() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Mentor or Advisor</CardTitle>
        <CardDescription>
          This is the form to add a mentor or advisor
        </CardDescription>
      </CardHeader>
      <AddForm />
    </Card>
  )
}

export default AddTeacher