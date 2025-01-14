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
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { scheduleAppointment } from "@/services/appointmentApi";
import { useToast } from "@/hooks/use-toast";

export default function ScheduleAppointment({ onClose, propertyId, owner }) {
  const { toast } = useToast();

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
    appointmentFor: z.string().nonempty("Property ID is required"),
    appointmentWith: z.string().nonempty("Owner ID is required"),
  });

  const appointmentForm = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      appointmentDate: "",
      appointmentTime: "",
      appointmentWith: owner,
      appointmentFor: propertyId,
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = await scheduleAppointment(data);

      if (res.status === 200) {
        console.log("Appointment Scheduled:", res.data);
        toast({
          title: "Appointment Scheduled Successfully",
          description: `Your appointment is scheduled`,
          variant: "success",
        });
        onClose();
      }
    } catch (error) {
      if (error?.status === 409) {
        // Specific handling for 409 error
        console.error("Appointment Already Exists:", error);
        toast({
          title: "Appointment Already Exists",
          description: error.data?.message || "Conflict detected.",
          variant: "destructive",
        });
      } else if (error?.status) {
        // General API error handling
        console.error("API Error:", error);
        toast({
          title: "Failed to Schedule Appointment",
          description: error.data?.message || "An unexpected error occurred.",
          variant: "destructive",
        });
      } else {
        // Network error
        console.error("Network Error:", error);
        toast({
          title: "Network Error",
          description: "Please check your connection and try again.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <Card className="w-full">
      <CardHeader />
      <CardContent>
        <Form {...appointmentForm}>
          <form
            onSubmit={appointmentForm.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <div className="flex flex-wrap gap-4 sm:gap-6 sm:flex-nowrap">
              {/* Date Field */}
              <FormField
                control={appointmentForm.control}
                name="appointmentDate"
                render={({ field }) => (
                  <FormItem className="w-full sm:w-1/2">
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} className="w-full" />
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
                      <Input type="time" {...field} className="w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end space-x-4">
              <Button variant="outline" type="button" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
