import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, Bell, CircleOff, CalendarClock } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import defaultProperty from "@/assets/property.jpg";

export default function AppointmentDetails({
  user,
  role,
  date,
  time,
  propertyName,
  propertyImage,
  propertyAmount,
  propertySubtype,
  onClose,
}) {
  return (
    <div className="block">
      <img
        src={propertyImage || defaultProperty}
        className="rounded-2xl object-cover h-56 w-full"
        alt={propertyName}
      />

      <div className="flex flex-wrap justify-between items-center">
        <div>
          <h4 className="font-semibold text-black dark:text-white text-lg pt-2">
            {propertyName}
          </h4>
          <p className="text-gray-600 dark:text-gray-400 text-sm ">
            {propertySubtype}
          </p>
        </div>

        <p className="font-semibold text-primary text-lg"> ₹{propertyAmount}</p>
      </div>

      <hr className="my-4" />
      <Card className="w-full border-none shadow-none">
        <CardHeader className="p-2">
          <div className="flex gap-4 flex-wrap items-center">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <CardTitle>{user}</CardTitle>
              <p className="text-sm">{role}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex justify-between px-4 py-4">
          <div className="flex items-center gap-1">
            <Calendar className="size-4" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="size-4" />
            <span>{time}</span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between mt-8 pt-4 border-t border-t-gray-400">
          <p onClick={onClose}>Cancel</p>
          <div className="flex gap-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Bell className="text-orange-700 size-4 cursor-pointer" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Re-Notify</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <CircleOff className="text-red-900 size-4 cursor-pointer" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Reject</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <CalendarClock className="text-yellow-800 size-4 cursor-pointer" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Re-Schedule</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
