import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { z } from "zod";
import { useParams } from "react-router-dom";
import { useAuthContext } from "@/context/authContext";
import { counterOffer } from "@/services/saleNotation";

export default function CounterOffer({ owner, onClose }) {
  const { conversationId } = useParams();

  //Auth User or Sender
  const { authUser } = useAuthContext();

  const formSchema = z.object({
    // expectedBySeller_totalPaymentAmount: z.number().nonnegative(),
    // expectedBySeller_totalTime: z.number().nonnegative(),
    // expectedBySeller_earnestMoney: z.number().nonnegative(),
    // expectedByBuyer_totalPaymentAmount: z.number().nonnegative(),
    // expectedByBuyer_totalTime: z.number().nonnegative(),
    // expectedByBuyer_earnestMoney: z.number().nonnegative(),
  });

  const counterOfferForm = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      offerDetails: {
        expectedByBuyer_totalPaymentAmount: 0,
        expectedByBuyer_totalTime: 0,
        expectedByBuyer_earnestMoney: 0,
      },
      owner: owner,
      propertyId: conversationId,
      sender: authUser?._id,
    },
  });

  //Form Fields
  const fields = [
    {
      id: 1,
      label: "Total Amount in INR",
      name: "offerDetails.expectedByBuyer_totalPaymentAmount",
      type: "number",
    },
    {
      id: 2,
      label: "Total Time in Days",
      name: "offerDetails.expectedByBuyer_totalTime",
      type: "number",
    },
    {
      id: 3,
      label: "Earnest Money in INR",
      name: "offerDetails.expectedByBuyer_earnestMoney",
      type: "number",
    },
  ];

  const onSubmit = async () => {
    try {
      console.log("SENDING SALE NOTATION: ", counterOfferForm.getValues());
      await counterOffer(conversationId, counterOfferForm.getValues());

      // Close the dialog on successful submission
      if (onClose) onClose();
    } catch (error) {
      console.error("Error submitting counter offer", error);
    }
  };

  return (
    <Form {...counterOfferForm}>
      <form
        onSubmit={counterOfferForm.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        {fields.map((formField) => (
          <FormField
            key={formField.id}
            control={counterOfferForm.control}
            name={formField.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{formField.label}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number" // Ensure input type is number
                    onChange={
                      (e) => field.onChange(Number(e.target.value) || 0) // Transform value to number
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
