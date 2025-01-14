import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Mail, Phone } from "lucide-react";

const SinglePropertyOwnerInfo = ({ owner }) => {
  const { ownerAvatar, ownerName, ownerEmail, ownerContact } = owner || {};
  return (
    <div className="mt-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-left text-xl font-semibold">
            Owner Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Owner Avatar and Name */}
          <div className="flex items-center mb-4">
            <Avatar className="w-12 h-12">
              <AvatarImage src={ownerAvatar} alt={ownerName || "Owner"} />
              <AvatarFallback>
                {ownerName ? ownerName.charAt(0) : "?"}
              </AvatarFallback>
            </Avatar>
            <div className="ml-4">
              <p className="text-lg font-medium">
                {ownerName || "Not Available"}
              </p>
            </div>
          </div>

          {/* Owner Email */}
          <div className="flex items-center mb-3">
            <Mail className="mr-2 text-gray-500" size={18} />
            <p className="text-sm text-black dark:text-white">
              {ownerEmail || "Not Available"}
            </p>
          </div>

          {/* Owner Contact */}
          <div className="flex items-center">
            <Phone className="mr-2 text-gray-500" size={18} />
            <p className="text-sm text-black dark:text-white">
              {ownerContact || "Not Available"}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SinglePropertyOwnerInfo;
