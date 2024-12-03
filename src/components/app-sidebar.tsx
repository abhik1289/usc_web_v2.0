"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import Link from 'next/link'
// This is sample data.
const data = {
  navMain: [
    {
      title: "Main",
      items: [
        {
          title: "Home",
          url: "/dashboard",
        },
        {
          title: "Users",
          url: "/user",
        },
        {
          title: "Leads",
          url: "#",
        },
        {
          title: "Projects",
          url: "#",
        },
        {
          title: "Events",
          url: "#",
        },
        {
          title: "Domains",
          url: "#",
        },
        {
          title: "Gallery",
          url: "#",
        },
        {
          title: "Champion ",
          url: "#",
        },
        {
          title: "Mentor and Advisor",
          url: "#",
        },
        {
          title: "Testimonials",
          url: "#",
        },
      ],
    },
    {
      title: "Others",
      items: [
        {
          title: "Customization",
          url: "#",
        },
        {
          title: "Socials",
          url: "#",
        },
        {
          title: "Cards",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = usePathname();
  console.log(location);
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="organization_title bg-[#2d3436] p-3 rounded-xl">
          <div className="title clear-start text-xl">USC KIIT DASHBOARD</div>
          <div className="description italic text-slate-400">
            Manage and Operate Website
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="mt-1 pb-3">
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item, i) => (
                  <SidebarMenuItem key={i}>
                    <SidebarMenuButton asChild isActive={location === item.url}>
                      <Link href={`${item.url}`}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
