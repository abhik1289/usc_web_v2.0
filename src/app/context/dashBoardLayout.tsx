import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { MdEventAvailable } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { RiUserShared2Fill } from "react-icons/ri";
import { SiGoogledomains } from "react-icons/si";
import { IoIosLogOut } from "react-icons/io";
import Image from "next/image";
export const dashboardCArdList = [
  {
    id: 1,
    number: 15,
    title: "Current Leads",
    icon: <FaUsers />,
  },
  {
    id: 2,
    number: 8,
    title: "Former Leads",
    icon: <RiUserShared2Fill />,
  },
  {
    id: 3,
    number: 5,
    title: "Events",
    icon: <MdEventAvailable />,
  },
  {
    id: 4,
    number: 9,
    title: "Domains",
    icon: <SiGoogledomains />,
  },
];

export default function DashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
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
            <div className="profile w-[40px] h-[40px] cursor-pointer bg-[#636e72] rounded-full relative">
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
        {children}
       
      </SidebarInset>
    </SidebarProvider>
  );
}
