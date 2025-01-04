"use client";

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import AddForm from './AddForm'
import { useSearchParams } from 'next/navigation';
import useGetAdvisorById from '@/hooks/api/mentor/useGetAdvisorById';
import EditForm from './EditForm';

function AddTeacher() {

  // HOOKS
  const params = useSearchParams();
  const id = params.get('id');
  const advisoryData = useGetAdvisorById(id);

  // define title and subtitle
  const title = id ? 'Edit Mentor or Advisor' : 'Add Mentor or Advisor';
  const subTitle = id ? 'Edit the mentor or advisor' : 'Add a new mentor or advisor';




  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {subTitle}
        </CardDescription>
      </CardHeader>
      {id && advisoryData.data ? <EditForm
        defaultValues={{
          fullName: advisoryData.data.fullName,
          school: advisoryData.data.school,
          memberType: advisoryData.data.memberType,
          rolesId:advisoryData.data.memberType==="Mentor"? advisoryData.data.rolesId:"",
          customPosition:  advisoryData.data.memberType==="Mentor"? advisoryData.data.customPosition:"",
        }}
        imageUrl={advisoryData.data.profilePhoto}
      /> : <AddForm
        defaultValues={{
          fullName: '',
          school: '',
          memberType: 'Mentor',
          rolesId: '',
          customPosition: '',
        }} />}
    </Card>
  )
}

export default AddTeacher