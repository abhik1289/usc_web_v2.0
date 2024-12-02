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

const dashboardCArdList = [
  {
    id: 1,
    number: 15,
    title: "Current Leads",
  },
  {
    id: 1,
    number: 8,
    title: "Former Leads",
  },
  {
    id: 1,
    number: 5,
    title: "Events",
  },
  {
    id: 1,
    number: 9,
    title: "Domains",
  },
];

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
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
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-4">
            {dashboardCArdList.map((item, i) => (
              <div
                className="aspect-video rounded-xl bg-muted/50 p-4 flex gap-3 items-center"
                key={item.id}
              >
                <div className="left">
                  <div className="icon w-[50px] h-[50px] bg-blue-600 rounded-md"></div>
                </div>
                <div className="right">
                  <div className="number text-4xl">{item.number}</div>
                  <div className="title italic">{item.title}</div>
                </div>
              </div>
            ))}
          </div>
          {/* <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
