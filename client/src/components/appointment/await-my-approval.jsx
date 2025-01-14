import React, { useState } from "react";
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
import AppointmentDetails from "./appointment-details";
import { format } from "date-fns";
import AcceptAppointment from "./accept-appointment";
import ReScheduleAppointment from "./re-schedule-appointment";

export default function AwaitingMyApproval({
  user,
  role,
  date,
  time,
  avatar,
  appointmentId,
  propertyName,
  propertyImage,
  propertyAmount,
  propertySubtype,
}) {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const appointmentDate = format(new Date(date), "dd-MM-yyy");

  return (
    <Card className="w-full md:w-1/4">
      <CardHeader>
        <div className="flex gap-4 flex-wrap items-center">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-start items-start">
            <CardTitle>{propertyName}</CardTitle>
            <CardDescription>{role}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex justify-between px-6 pb-2 flex-wrap items-center">
        <div className="flex justify-start items-center gap-1">
          <Calendar className="size-4" />
          <span>{appointmentDate}</span>
        </div>
        <div className="flex justify-start items-center gap-1">
          <Clock className="size-4" />
          <span>{time}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between gap-6 pt-4 items-center flex-wrap">
        <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
          <AlertDialogTrigger asChild className="cursor-pointer">
            <p className="text-sm underline underline-offset-4 text-black dark:text-white">
              Appointment Details
            </p>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Appointment Details</AlertDialogTitle>
              <AlertDialogDescription>
                <AppointmentDetails
                  user={user}
                  role={role}
                  date={appointmentDate}
                  time={time}
                  propertyName={propertyName}
                  propertyImage={propertyImage}
                  propertyAmount={propertyAmount}
                  propertySubtype={propertySubtype}
                  onClose={() => setIsAlertOpen(false)}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

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
                <ReScheduleAppointment
                  owner={user}
                  appointmentId={appointmentId}
                  prevDate={date}
                  prevTime={time}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Re-Schedule Appointment</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <AcceptAppointment appointmentId={appointmentId} />
        </div>
      </CardFooter>
    </Card>
  );
}
