"use client"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@radix-ui/react-separator'
import React from 'react'
import { IoIosLogOut } from 'react-icons/io'
import Image from "next/image";
import { useRouter } from 'next/navigation'
export default function DashBoardHeader() {
    const router = useRouter();
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
          <div className="right_side flex gap-4">
            <div onClick={()=>router.push("/profile")} className="profile w-[40px] h-[40px] cursor-pointer bg-[#636e72] rounded-full relative">
              <Image
                src={"https://avatar.iran.liara.run/public/38"}
                width={40}
                height={40}
                alt={"profile_image"}
              />
            </div>
            <div className="logoutBtn w-[40px] h-[40px] bg-[#636e72] rounded-full flex justify-center items-center text-xl cursor-pointer">
              <IoIosLogOut />
            </div>
          </div>
        </header>
  )
}
