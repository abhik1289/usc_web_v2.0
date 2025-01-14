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
import { GiChampions } from "react-icons/gi";
import { VscFeedback } from "react-icons/vsc";
import { FaUserTie } from "react-icons/fa";
import { FaUserLarge } from "react-icons/fa6";
import { SiCloudflareworkers } from "react-icons/si";
import useHomeStore from "@/store/HomeDetails";
// export const 

export default function DashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashBoardHeader />
        {children}

      </SidebarInset>
    </SidebarProvider>
  );
}
