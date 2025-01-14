import React from "react";
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
import { useToast } from "@/hooks/use-toast";
import { date, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarClock } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { format } from "date-fns";
import { reScheduleAppointment } from "@/services/appointmentApi";

export default function ReScheduleAppointment({
  owner,
  propertyId,
  appointmentId,
  prevDate,
  prevTime,
}) {
  const { toast } = useToast();

  const prevAppointmentDate = format(new Date(prevDate), "dd-MM-yyyy");

  console.table(owner, appointmentId, prevAppointmentDate, prevTime);

  // Form validation schema
  const formSchema = z.object({
    appointmentDate: z
      .string()
      .nonempty("Date is required")
      .refine(
        (value) => /^\d{4}-\d{2}-\d{2}$/.test(value),
        "Invalid date format (expected YYYY-MM-DD)"
      ),
    appointmentTime: z.string().nonempty("Time is required"),
    appointmentWith: z.string().nonempty("Owner ID is required"),
  });

  const appointmentForm = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      appointmentDate: "",
      appointmentTime: "",
      appointmentWith: owner,
    },
  });

  const onSubmit = async () => {
    console.log("Form Submitted", appointmentForm.getValues());
    const res = await reScheduleAppointment(
      appointmentId,
      appointmentForm.getValues()
    );

    if (res) {
      toast({
        title: "Appointment Rescheduled",
        description: "Appointment rescheduled successfully.",
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <CalendarClock className="text-yellow-800 size-4" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Re-Schedule Appointment</AlertDialogTitle>
          <AlertDialogDescription>
            <Card className="w-full">
              <CardContent>
                <Form {...appointmentForm}>
                  <form
                    onSubmit={appointmentForm.handleSubmit(onSubmit)}
                    className="space-y-2 py-4"
                  >
                    <div className="flex flex-wrap gap-4 sm:gap-6 sm:flex-nowrap p-0">
                      {/* Date Field */}
                      <FormField
                        control={appointmentForm.control}
                        name="appointmentDate"
                        render={({ field }) => (
                          <FormItem className="w-full sm:w-1/2">
                            <FormLabel>Date</FormLabel>
                            <FormControl>
                              <Input
                                type="date"
                                {...field}
                                className="w-full"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {/* Time Field */}
                      <FormField
                        control={appointmentForm.control}
                        name="appointmentTime"
                        render={({ field }) => (
                          <FormItem className="w-full sm:w-1/2">
                            <FormLabel>Time</FormLabel>
                            <FormControl>
                              <Input
                                type="time"
                                {...field}
                                className="w-full"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={appointmentForm.handleSubmit(onSubmit)}>
            Re-Schedule
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
