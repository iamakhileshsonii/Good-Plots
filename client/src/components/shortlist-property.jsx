import React, { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Button } from "./ui/button";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { shortlistProperty } from "@/services/propertyApi";

export default function ShortlistProperty({
  propertyId,
  isShortlisted,
  setIsShortlisted,
}) {
  const handleShotlist = async () => {
    const res = await shortlistProperty(propertyId);
    setIsShortlisted(!isShortlisted);
    console.log("PROPERTY SHORTLISTED", res);
  };
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Button variant="ghost" size="icon" onClick={handleShotlist}>
            {isShortlisted ? (
              <BookmarkCheck className="h-4 w-4" />
            ) : (
              <Bookmark className="h-4 w-4" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isShortlisted ? "Delist" : "Shortlist"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
