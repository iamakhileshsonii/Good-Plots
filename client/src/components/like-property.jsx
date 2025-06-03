import React, { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Button } from "./ui/button";
import { Heart, HeartCrack, HeartHandshake, HeartIcon } from "lucide-react";
import { likeProperty } from "@/services/propertyApi";

export default function LikeProperty({ propertyId, isLiked, setIsLiked }) {
  const handleLike = async () => {
    const res = await likeProperty(propertyId);
    console.log("IS LIKED: ", isLiked);
    setIsLiked(!isLiked);
    console.log("PROPERTY LIKED", res);
  };
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Button variant="ghost" size="icon" onClick={handleLike}>
            {isLiked ? (
              <HeartHandshake className="h-4 w-4 text-red-800" />
            ) : (
              <Heart className="h-4 w-4" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isLiked ? "Unlike" : "Like"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
