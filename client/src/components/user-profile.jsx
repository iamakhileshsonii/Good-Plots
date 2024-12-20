import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGlobe } from "react-icons/fa"; // For icons

const UserProfileCard = () => {
  return (
    <div className="flex justify-center items-center w-full">
      <Card className="w-80 border border-gray-300 shadow-lg">
        <CardHeader className="flex items-center space-x-4 p-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src="" alt="User Avatar" />
            <AvatarFallback className="bg-gray-200 text-gray-700">
              CN
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg font-semibold">User Name</CardTitle>
            <CardDescription className="text-sm text-gray-500">
              User Role
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 p-4">
          <div className="flex items-center space-x-2 text-gray-700">
            <FaEnvelope className="text-blue-500" />
            <span>user@example.com</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-700">
            <FaPhone className="text-green-500" />
            <span>+1 (123) 456-7890</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-700">
            <FaMapMarkerAlt className="text-red-500" />
            <span>123 Main St, City, Country</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-700">
            <FaGlobe className="text-yellow-500" />
            <a
              href="https://example.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              www.example.com
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfileCard;
