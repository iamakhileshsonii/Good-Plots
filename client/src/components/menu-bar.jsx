import React, { useState } from "react";
import { Button } from "@/components/ui/button"; // Example Button component from ShadCN
import { Link } from "react-router-dom";
import { useAuthContext } from "@/context/authContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import defaultAvatar from "@/assets/property.jpg";
import logo from "@/assets/Logo.png";
import { X } from "lucide-react";

const MenuBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { authUser, isAuthenticated } = useAuthContext();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Header with Hamburger Icon */}
      <header className="bg-white border-b border-gray-200 shadow-sm p-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-3">
          <img
            src={logo} // Replace with your logo's path
            alt="GoodPlots"
            className="h-8 "
          />
        </Link>

        {/* Hamburger icon for mobile view */}
        <Button
          variant="default"
          onClick={toggleMenu}
          className="md:hidden flex items-center"
        >
          ☰
        </Button>

        {/* Menu Options (for non-mobile view) */}
        <nav className="hidden md:flex items-center space-x-4">
          <Link
            to="/"
            className="text-gray-700 hover:text-gray-900 transition-colors"
          >
            About
          </Link>
          <Link
            to="/"
            className="text-gray-700 hover:text-gray-900 transition-colors"
          >
            Contact
          </Link>
          <Link
            to="/explore-properties"
            className="text-gray-700 hover:text-gray-900 transition-colors"
          >
            Explore Properties
          </Link>
          {isAuthenticated ? (
            <Link to="/account" className="flex items-center gap-2 ">
              <Avatar>
                <AvatarImage src={authUser.avatar || defaultAvatar} />
                <AvatarFallback>{authUser.fullname}</AvatarFallback>
              </Avatar>
              <span className="font-semibold capitalize">
                {authUser.fullname}
              </span>
            </Link>
          ) : (
            <Link to="/login">
              <Button variant="default">Login</Button>
            </Link>
          )}
        </nav>
      </header>

      {/* Off-Canvas Menu for mobile view */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transform ${
          isOpen ? "translate-x-0 " : "-translate-x-full "
        } transition-transform duration-300 z-50 `}
      >
        <div className="p-4 flex justify-between items-center border-b border-gray-700 relative">
          <span className="text-lg font-semibold">Menu</span>
          <Button className="" onClick={toggleMenu}>
            <X className="w-5 h-5 text-white" />
          </Button>
        </div>
        <nav className="flex flex-col p-4 space-y-2">
          <Link to="/" className="hover:text-gray-300 text-left">
            Home
          </Link>
          <Link to="/" className="hover:text-gray-300 text-left">
            About
          </Link>
          <Link to="/" className="hover:text-gray-300 text-left">
            Contact
          </Link>
          <Link to="/" className="hover:text-gray-300 text-left">
            Services
          </Link>
        </nav>
        <Link to="/login" className="absolute bottom-4">
          <Button variant="default">Login</Button>
        </Link>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMenu}
        ></div>
      )}
    </div>
  );
};

export default MenuBar;
