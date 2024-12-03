import React from 'react'
import { IoIosSearch } from "react-icons/io";
function UserHeader() {
  return (
    <div className='wrapper flex justify-between items-center py-4 px-6 relative'>
   
      <div className="searchBar relative">
      <div className="search_btn absolute top-[50%] translate-y-[-50%] left-3">
      <IoIosSearch />
      </div>
        <input type="text" className='w-[400px] px-2 border border-slate-400 pl-10 py-2 rounded-md outline-none' />
      </div>
      <div className="addUserButton">
        <button className='w-[140px] h-[40px]  bg-blue-500 rounded-md'>Add User</button>
      </div>
    </div>
  )
}

export default UserHeader