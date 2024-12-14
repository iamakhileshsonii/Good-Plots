import * as React from "react";
import {
  BookOpen,
  Bot,
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import ThemeToggle from "./ThemeToggle";
import { useAuthContext } from "@/context/authContext";
import { Link } from "react-router-dom";
import {
  FaChartBar,
  FaClock,
  FaHome,
  FaMeetup,
  FaTimesCircle,
} from "react-icons/fa";

const data = {
  navMain: [
    {
      title: "My Activity",
      url: "#",
      icon: FaChartBar,
      isActive: true,
      items: [
        {
          title: "Liked Properties",
          url: "/account/liked-properties",
        },
        {
          title: "Shortlisted Properties",
          url: "/account/shortlisted-properties",
        },
      ],
    },
    {
      title: "Appointments",
      url: "#",
      icon: FaClock,
      items: [
        {
          title: "Confirmed",
          url: "#",
        },
        {
          title: "Requested By Me",
          url: "#",
        },
        {
          title: "Awaiting My Approval",
          url: "#",
        },
      ],
    },

    {
      title: "My Properties",
      url: "#",
      icon: FaHome,
      items: [
        {
          title: "Publish Property",
          url: "/account/publish-property",
        },
        {
          title: "Verified Properties",
          url: "/account/verified-properties",
        },
        {
          title: "Pending Properties",
          url: "/account/pending-properties",
        },
        {
          title: "Property KYC",
          url: "/account/property-kyc",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }) {
  const { authUser } = useAuthContext();

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <ThemeToggle />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <Link
                  to="/account/profile"
                  className="grid flex-1 text-left text-sm leading-tight"
                >
                  <span className="truncate font-semibold">
                    {authUser?.fullname}
                  </span>
                  <span className="truncate text-xs">{authUser?.role}</span>
                </Link>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={authUser} />
      </SidebarFooter>
    </Sidebar>
  );
}
