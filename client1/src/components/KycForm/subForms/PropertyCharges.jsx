import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

const PropertyCharges = () => {
  const formSchema = z.object({
    // expectedRent: z.number().nonnegative(),
    // securityAmount: z.number().nonnegative(),
    // priceIncludes: z.number().nonnegative(),
    // otherCharges: z.number().nonnegative(),
    // maintenanceCharges: z.number().nonnegative(),
    // brokerage: z.number().nonnegative(),
  });

  const propertyChargesForm = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // expectedRent: 0,
      // securityAmount: 0,
      // priceIncludes: 0,
      // otherCharges: 0,
      // maintenanceCharges: 0,
      // brokerage: 0,
    },
  });

  const onSubmit = async () => {
    console.log("Property Charges Form: ", propertyChargesForm.getValues());
  };

  const fields = [
    { label: "Expected Rent", name: "expectedRent", type: "number" },
    { label: "Security", name: "securityAmount", type: "number" },
    { label: "Price Includes", name: "priceIncludes", type: "number" },
    { label: "Other Charges", name: "otherCharges", type: "number" },
    { label: "Maintenance", name: "maintenanceCharges", type: "number" },
    { label: "Brokerage", name: "brokerage", type: "number" },
  ];

  return (
    <Form {...propertyChargesForm}>
      <form
        onSubmit={propertyChargesForm.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        {fields.map((formField, index) => (
          <FormField
            key={index}
            control={propertyChargesForm.control}
            name={formField.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{formField.label}</FormLabel>
                <FormControl>
                  <Input
                    type={formField.type}
                    placeholder={formField.label}
                    {...field}
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
};

export default PropertyCharges;
