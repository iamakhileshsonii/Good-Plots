import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Bookmark, Phone, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import defaultImage from "../assets/property.jpg";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ScheduleAppointment from "./appointment/schedule-appointment";
import { useEffect, useState } from "react";
import LikeProperty from "./like-property";
import ShortlistProperty from "./shortlist-property";
import { isPropertyLiked, isPropertyShortlisted } from "@/services/propertyApi";

export default function PropertyCard({
  id,
  imageUrl,
  title,
  price,
  description,
  saleType,
  propertySubtype,
  featuredImage,
  owner,
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Dialog state
  const [isLiked, setIsLiked] = useState(false);
  const [isShortlisted, setIsShortlisted] = useState(false);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  //Check if the property is liked
  const ifPropertyLiked = async () => {
    const res = await isPropertyLiked(id);

    if (res === true) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  };

  //Check if the property is shortlisted
  const ifPropertyShortlisted = async () => {
    const res = await isPropertyShortlisted(id);
    if (res === true) {
      setIsShortlisted(true);
    } else {
      setIsShortlisted(false);
    }
  };

  useEffect(() => {
    ifPropertyLiked();
    ifPropertyShortlisted();
  }, []);
  return (
    <Card className="max-w-sm overflow-hidden transition-shadow hover:shadow-lg">
      <Link to={`/property/${id}`} className="block">
        <div className="relative w-full h-48">
          <img
            src={featuredImage || defaultImage}
            alt={title}
            className="w-full h-full object-cover"
          />
          <Badge
            variant={saleType === "rent" ? "secondary" : "destructive"}
            className="absolute top-2 left-2"
          >
            {saleType === "rent" ? "For Rent" : "For Sale"}
          </Badge>
        </div>
      </Link>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{title}</span>
          <span className="text-lg font-bold text-green-600">{price}</span>
        </CardTitle>
        <p className="text-sm text-muted-foreground dark:text-gray-400 text-left">
          {propertySubtype}
        </p>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 dark:text-white text-left">
          {description.slice(0, 120)}...
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <LikeProperty
          propertyId={id}
          isLiked={isLiked}
          setIsLiked={setIsLiked}
        />

        <ShortlistProperty
          propertyId={id}
          isShortlisted={isShortlisted}
          setIsShortlisted={setIsShortlisted}
        />

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              {" "}
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.preventDefault();
                  console.log("Call clicked");
                }}
              >
                <Phone className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Call</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <AlertDialogTrigger>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Calendar className="h-4 w-4" onClick={openDialog} />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Schedule Appointment</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                <p>Schedule Appointment</p>
                <span className="font-normal text-sm text-gray-600 dark:text-white">
                  Select a date and time for your appointment.
                </span>
              </AlertDialogTitle>

              <AlertDialogDescription>
                <ScheduleAppointment
                  propertyId={id}
                  property={title}
                  saleType={saleType}
                  propertySubtype={propertySubtype}
                  owner={owner}
                  onClose={closeDialog}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
