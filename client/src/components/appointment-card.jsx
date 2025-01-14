import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Bell,
  Calendar,
  CalendarClock,
  Check,
  CircleOff,
  Clock,
  Cross,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function AppointmentCard() {
  return (
    <Card className="w-full md:w-1/4">
      <CardHeader>
        <div className="flex gap-4 flex-wrap items-center">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-start items-start">
            <CardTitle>{user}</CardTitle>
            <CardDescription>{role}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex justify-between px-6 pb-2">
        <div className="flex justify-start items-center gap-1">
          <Calendar className="size-4" />
          <span>{date}</span>
        </div>
        <div className="flex justify-start items-center gap-1">
          <Clock className="size-4" />
          <span>{time}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between gap-6 pt-4 items-center">
        <p className="text-sm underline underline-offset-4 text-black dark:text-white">
          Appointment Details
        </p>

        <div className="flex justify-evenly gap-4 ">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Bell className="text-orange-700 size-4" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Re Notify</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <CircleOff className="text-red-900 size-4" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Reject Appointment</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <CalendarClock className="text-yellow-800 size-4" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Re-Schedule Appointment</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Check className="text-green-700 size-4" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Accept Appointment</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardFooter>
    </Card>
  );
}
