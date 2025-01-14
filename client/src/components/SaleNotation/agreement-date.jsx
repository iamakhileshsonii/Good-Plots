import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

const formSchema = z.object({
  //   username: z.string().min(2, {
  //     message: "Username must be at least 2 characters.",
  //   }),
});

export default function AgreementDate() {
  const appointmentForm = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      agreementDate: null,
    },
  });

  const onSubmit = async () => {
    console.log("AGREEMENT DATE: ", appointmentForm.getValues());
    //  await sendSaleNotationMessage(initiatePurchaseForm.getValues());
  };
  return (
    <Form {...appointmentForm}>
      <form
        onSubmit={appointmentForm.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <FormField
          control={appointmentForm.control}
          name="agreementDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Agreement Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={
                      (date) => date < new Date().setHours(0, 0, 0, 0) // Disable dates before today
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
