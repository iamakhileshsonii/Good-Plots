import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export function NavExploreProperties() {
  const { isMobile } = useSidebar();

  const items = [
    {
      id: 1,
      title: "Explore Properties",
      url: "/account/explore-properties",
      icon: null, // Replace with a valid icon component, e.g., <SomeIcon />
    },
  ];

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Explore Properties</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.id}>
            <SidebarMenuButton asChild size="sm">
              <Link to={item.url} className="flex items-center space-x-2">
                {item.icon && <span>{item.icon}</span>}
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
