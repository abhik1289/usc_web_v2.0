import { AppSidebar } from "@/components/app-sidebar";

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import DashBoardHeader from "@/components/(admin)/header/dashboard-header";

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
