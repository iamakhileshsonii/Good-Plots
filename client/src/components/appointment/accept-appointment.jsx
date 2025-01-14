import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Check, CircleOff } from "lucide-react";
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
import { acceptAppointment } from "@/services/appointmentApi";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export default function AcceptAppointment({ appointmentId }) {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAcceptAppointment = async () => {
    const res = await acceptAppointment(appointmentId);
    if (res) {
      toast({
        title: "Appointment Accepted",
        description: "The appointment has been successfully accepted.",
      });

      navigate("/account/appointments/confirmed");
    }
  };
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Check
            className="text-green-700 size-4 cursor-pointer"
            onClick={handleAcceptAppointment}
          />
        </TooltipTrigger>
        <TooltipContent>
          <p>Accept</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
