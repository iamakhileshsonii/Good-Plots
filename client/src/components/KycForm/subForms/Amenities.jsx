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

const Amenities = () => {
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

  const amenitiesForm = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Cafeteria: false,
      Gym: false,
      Intercom: false,
      Lift: false,
      Parking: false,
      WaterStorage: false,
      centralAirCondition: false,
      clubHouse: false,
      gasPipeline: false,
      gatedSociety: false,
      maintenanceStaff: false,
      privateGardenTerrace: false,
      rainWaterHarvesting: false,
      securityFireAlarm: false,
      shoppingMall: false,
      sportsFacility: false,
      staffQuarter: false,
      streetLighting: false,
      swimmingPool: false,
      vastuCompliant: false,
      visitorParking: false,
      wasteDisposal: false,
      waterPurifier: false,
    },
  });

  const onSubmit = async () => {
    await updateKycFormData("amenities", amenitiesForm.getValues());
    nextStep();
  };

  //Fields
  const fields = [
    { id: 1, label: "Gas Pipeline", name: "gasPipeline", type: "checkbox" },
    { id: 2, label: "Swimming Pool", name: "swimmingPool", type: "checkbox" },
    { id: 3, label: "Gym", name: "Gym", type: "checkbox" },
    { id: 4, label: "Lift", name: "Lift", type: "checkbox" },
    { id: 5, label: "Gated Society", name: "gatedSociety", type: "checkbox" },
    { id: 6, label: "Parking", name: "Parking", type: "checkbox" },
    { id: 7, label: "Club House", name: "clubHouse", type: "checkbox" },
    {
      id: 8,
      label: "Rain Water Harvesting",
      name: "rainWaterHarvesting",
      type: "checkbox",
    },
    { id: 9, label: "Intercom", name: "Intercom", type: "checkbox" },
    {
      id: 10,
      label: "Maintenance Staff",
      name: "maintenanceStaff",
      type: "checkbox",
    },
    {
      id: 11,
      label: "Vastu Compliant",
      name: "vastuCompliant",
      type: "checkbox",
    },
    {
      id: 12,
      label: "Security Fire Alarm",
      name: "securityFireAlarm",
      type: "checkbox",
    },
    { id: 13, label: "Cafeteria", name: "Cafeteria", type: "checkbox" },
    {
      id: 14,
      label: "Sports Facility",
      name: "sportsFacility",
      type: "checkbox",
    },
    { id: 15, label: "Staff Quarter", name: "staffQuarter", type: "checkbox" },
    {
      id: 16,
      label: "Water Purifier",
      name: "waterPurifier",
      type: "checkbox",
    },
    {
      id: 17,
      label: "Waste Disposal",
      name: "wasteDisposal",
      type: "checkbox",
    },
    { id: 18, label: "Shopping Mall", name: "shoppingMall", type: "checkbox" },
    {
      id: 19,
      label: "Visitor Parking",
      name: "visitorParking",
      type: "checkbox",
    },
    { id: 20, label: "Water Storage", name: "WaterStorage", type: "checkbox" },
    {
      id: 21,
      label: "Central Air Condition",
      name: "centralAirCondition",
      type: "checkbox",
    },
    {
      id: 22,
      label: "Private Garden/Terrace",
      name: "privateGardenTerrace",
      type: "checkbox",
    },
    {
      id: 23,
      label: "Street Lighting",
      name: "streetLighting",
      type: "checkbox",
    },
  ];

  return (
    <Form {...amenitiesForm}>
      <form
        onSubmit={amenitiesForm.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <div className="flex justify-start gap-2 flex-wrap">
          {fields.map((formField, index) => (
            <FormField
              key={index}
              control={amenitiesForm.control}
              name={formField.name}
              render={({ field }) => (
                <FormItem className="flex gap-1 items-center">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>{formField.label}</FormLabel>
                </FormItem>
              )}
            />
          ))}
        </div>
        <div className="mt-6 flex justify-between ">
          <Button onClick={prevStep}>Previous</Button>
          <Button type="submit">Next</Button>
        </div>
      </form>
    </Form>
  );
};

export default Amenities;
