import React, { useState } from "react";
import { Button } from "@/components/ui/button"; // Example Button component from ShadCN
import { Link } from "react-router-dom";
import { useAuthContext } from "@/context/authContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import defaultAvatar from "@/assets/property.jpg";

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
        <div className="text-lg font-semibold">MySite</div>

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
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 z-50`}
      >
        <div className="p-4 flex justify-between items-center border-b border-gray-700">
          <span className="text-lg font-semibold">Menu</span>
          <Button
            variant="outline"
            className="text-white border-white"
            onClick={toggleMenu}
          >
            ✕
          </Button>
        </div>
        <nav className="flex flex-col p-4 space-y-2">
          <a href="#" className="hover:text-gray-300">
            Home
          </a>
          <a href="#" className="hover:text-gray-300">
            About
          </a>
          <a href="#" className="hover:text-gray-300">
            Contact
          </a>
          <a href="#" className="hover:text-gray-300">
            Services
          </a>
        </nav>
        <Link to="/login">
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
