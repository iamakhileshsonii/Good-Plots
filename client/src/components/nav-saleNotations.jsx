import { Folder, MoreHorizontal, Share, Trash2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import useSaleNotation from "@/context/useSaleNotation";
import { FaChartBar, FaSalesforce } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSaleNotationConversations } from "@/services/saleNotation";

export function NavSaleNotation() {
  const { isMobile } = useSidebar();
  const [conversations, setConversations] = useState();

  //Fetch Conversations
  const fetchConversations = async () => {
    const res = await getSaleNotationConversations();

    if (res) {
      setConversations(res);
    } else {
      setConversations([]);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Sale Notations</SidebarGroupLabel>
      {conversations &&
        conversations.map((conversation) => (
          <Link
            to={`/account/sale-notation/${conversation._id}`}
            className="flex items-center gap-2"
            key={conversation._id}
          >
            <FaSalesforce />
            <span className="text-sm">
              {conversation?.propertyDetails[0]?.title}
            </span>
          </Link>
        ))}
    </SidebarGroup>
  );
}
