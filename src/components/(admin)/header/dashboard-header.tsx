"use client"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@radix-ui/react-separator'
import React from 'react'
import { IoIosLogOut } from 'react-icons/io'
import Image from "next/image";
import { useRouter } from 'next/navigation'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import useAuthStore from '@/store/Auth'
export default function DashBoardHeader() {
  const router = useRouter();
  const { name, role } = useAuthStore();
  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4">
      <div className="left_side flex items-center">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="#">
                Building Your Application
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Data Fetching</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="right_side flex gap-4 items-center">
        <div className="user_info text-right">
          <div className="name text-lg ">{name}</div>
          <div className="role text-sm text-slate-400 italic">{role[0] + role.substring(1).toLowerCase()}</div>
        </div>
        <div onClick={() => router.push("/profile")} className="profile w-[40px] h-[40px] cursor-pointer bg-[#636e72] rounded-full relative">
          <Avatar>

            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
