import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
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
import { sendSaleNotationMessage } from "@/services/saleNotation";
import { useAuthContext } from "@/context/authContext";

export default function InitiatePropertyPurchase({
  expectedBySeller_totalPaymentAmount,
  expectedBySeller_totalTime,
  expectedBySeller_earnestMoney,
  owner,
  propertyId,
}) {
  //Auth User
  const { authUser } = useAuthContext();

  const senderId = authUser._id;

  // Define form schema with number types
  const formSchema = z.object({
    // expectedBySeller_totalPaymentAmount: z.number().nonnegative(),
    // expectedBySeller_totalTime: z.number().nonnegative(),
    // expectedBySeller_earnestMoney: z.number().nonnegative(),
    // expectedByBuyer_totalPaymentAmount: z.number().nonnegative(),
    // expectedByBuyer_totalTime: z.number().nonnegative(),
    // expectedByBuyer_earnestMoney: z.number().nonnegative(),
  });

  const initiatePurchaseForm = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      offerDetails: {
        expectedBySeller_totalPaymentAmount,
        expectedBySeller_totalTime: expectedBySeller_totalTime || 90,
        expectedBySeller_earnestMoney,
        expectedByBuyer_totalPaymentAmount: 0,
        expectedByBuyer_totalTime: 0,
        expectedByBuyer_earnestMoney: 0,
      },
      owner,
      propertyId,
      sender: senderId,
    },
  });

  const onSubmit = async () => {
    console.log("SNEDING SALE NOTATION: ", initiatePurchaseForm.getValues());
    await sendSaleNotationMessage(initiatePurchaseForm.getValues());
  };

  //Form Fields
  const fields = [
    {
      id: 1,
      label: "Total Amount",
      name: "offerDetails.expectedByBuyer_totalPaymentAmount",
      type: "number",
    },
    {
      id: 2,
      label: "Total Time",
      name: "offerDetails.expectedByBuyer_totalTime",
      type: "number",
    },
    {
      id: 3,
      label: "Earnest Money",
      name: "offerDetails.expectedByBuyer_earnestMoney",
      type: "number",
    },
  ];

  return (
    <Form {...initiatePurchaseForm}>
      <form
        onSubmit={initiatePurchaseForm.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        {fields.map((formField) => (
          <FormField
            key={formField.id}
            control={initiatePurchaseForm.control}
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
