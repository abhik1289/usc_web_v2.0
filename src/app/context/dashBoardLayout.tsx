import { AppSidebar } from "@/components/app-sidebar";

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { MdEventAvailable } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { RiUserShared2Fill } from "react-icons/ri";
import { SiGoogledomains } from "react-icons/si";
import DashBoardHeader from "@/components/(admin)/header/dashboard-header";

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
        <DashBoardHeader/>
        {children}
       
      </SidebarInset>
    </SidebarProvider>
  );
}
