import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img
            src="/logo.svg" // Replace with your logo's path
            alt="Site Logo"
            className="h-8 w-8"
          />
          <span className="text-lg font-semibold text-gray-800">MySite</span>
        </div>

        {/* Menu Options */}
        <nav className="flex items-center space-x-4">
          <a
            href="#"
            className="text-gray-700 hover:text-gray-900 transition-colors"
          >
            Home
          </a>
          <a
            href="#"
            className="text-gray-700 hover:text-gray-900 transition-colors"
          >
            About
          </a>
          <a
            href="#"
            className="text-gray-700 hover:text-gray-900 transition-colors"
          >
            Contact
          </a>
          <Button variant="default" className="ml-2">
            Login
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
