import UserHeader from '@/components/(admin)/user/user-header'
import { UserTable } from '@/components/(admin)/user/user-table'
import React from 'react'

function page() {
  return (
    <div className='p-2'>
        <UserHeader/>
        <UserTable/>
    </div>
  )
}

export default page