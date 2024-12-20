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
import { Checkbox } from "@/components/ui/checkbox";
import useKyc from "@/context/useKyc";

const SocietyAndParking = () => {
  const {
    updateKycFormData,
    kycData,
    currentStep,
    nextStep,
    prevStep,
    submitKyc,
  } = useKyc();

  const formSchema = z.object({
    // expectedRent: z.number().nonnegative(),
    // securityAmount: z.number().nonnegative(),
    // priceIncludes: z.number().nonnegative(),
    // otherCharges: z.number().nonnegative(),
    // maintenanceCharges: z.number().nonnegative(),
    // brokerage: z.number().nonnegative(),
  });

  const societyAndParkingForm = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reservedParking: false,
      coveredParking: false,
      openParking: false,
      whetherInCooperativeSociety: false,
      whetherInGatedComplex: false,
      isThisCornerHouse: false,
    },
  });

  const fields = [
    {
      label: "Reserved Parking",
      name: "reservedParking",
      type: "select",
      options: ["yes", "no"],
    },
    {
      label: "Covered Parking",
      name: "coveredParking",
      type: "select",
      options: ["yes", "no"],
    },
    {
      label: "Open Parking",
      name: "openParking",
      type: "select",
      options: ["yes", "no"],
    },
    {
      label: "Whether In Cooperative Society",
      name: "whetherInCooperativeSociety",
      type: "select",
      options: ["yes", "no"],
    },
    {
      label: "Whether In Gated Complex",
      name: "whetherInGatedComplex",
      type: "select",
      options: ["yes", "no"],
    },
    {
      label: "Is This Corner House",
      name: "isThisCornerHouse",
      type: "select",
      options: ["yes", "no"],
    },
  ];

  const onSubmit = async () => {
    await updateKycFormData(
      "parkingAndSociety",
      societyAndParkingForm.getValues()
    );
    nextStep();
  };

  return (
    <Form {...societyAndParkingForm}>
      <form
        onSubmit={societyAndParkingForm.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        {fields.map((formField, index) => (
          <FormField
            key={index}
            control={societyAndParkingForm.control}
            name={formField.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{formField.label}</FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <div className="mt-6">
          <Button onClick={prevStep}>Previous</Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
};

export default SocietyAndParking;
