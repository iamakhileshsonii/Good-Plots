import {
  Card,
  CardContent,
  CardDescription,
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
import { useState } from "react";
import CancelAppointment from "./cancel-appointment";
import ReScheduleAppointment from "./re-schedule-appointment";

export default function RequestedByMe({
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

  const appointmentDate = format(new Date(date), "dd-MM-yyyy");

  return (
    <Card className="w-full md:w-1/4">
      <CardHeader>
        <div className="flex gap-4 flex-wrap items-center">
          <Avatar>
            <AvatarImage src={avatar || "https://github.com/shadcn.png"} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <CardTitle className="text-left">{propertyName}</CardTitle>
            <CardDescription className="text-left">{role}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex justify-between px-6 pb-2 flex-wrap items-center">
        <div className="flex items-center gap-1">
          <Calendar className="size-4" />
          <span>{appointmentDate}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="size-4" />
          <span>{time}</span>
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap justify-between gap-6 pt-4 items-center">
        <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
          <AlertDialogTrigger asChild>
            <p className="text-sm underline underline-offset-4 text-black dark:text-white cursor-pointer">
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
          </AlertDialogContent>

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

            <CancelAppointment appointmentId={appointmentId} />
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
                  <p>Re-Schedule</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
