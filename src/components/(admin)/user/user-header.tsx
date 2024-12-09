"use client"

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IoIosSearch } from "react-icons/io";
import AddUserDialog from "./add-user-dialog";

function UserHeader() {
  const [open, setOpen] = useState(false);
  
  const handleOpenDialog = () => {
    setOpen(true);
  };

  return (
    <div className="flex justify-between items-center py-4 px-6">
      <div className="relative w-[400px]">
        <IoIosSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
        <Input
          type="text"
          placeholder="Search"
          className="pl-10"
        />
      </div>
      <Button
        onClick={handleOpenDialog}
        variant="default"
        className="w-[140px] h-[40px]"
      >
        Add User
      </Button>
      <AddUserDialog open={open} setOpen={setOpen} />
    </div>
  );
}

export default UserHeader;

