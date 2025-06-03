import React from "react";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import { RadioGroupItem } from "@/components/ui/radio-group";
import useKyc from "@/context/useKyc";

// Define your fields and schema
const formSchema = z.object({});

const AreaDetails = () => {
  const {
    updateKycFormData,
    kycData,
    currentStep,
    nextStep,
    prevStep,
    submitKyc,
  } = useKyc();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      superArea: 0,
      length: 0,
      breadth: 0,
      facing: "EAST",
      carpetArea: 0,
      builtUpArea: 0,
      yearOfConstruction: 1900,
      ageOfTheProperty: 0,
    },
  });

  const onSubmit = async () => {
    await updateKycFormData("areaDetails", form.getValues());
    nextStep();
  };

  const fields = [
    { label: "Super Area", name: "superArea", type: "number" },
    { label: "Length", name: "length", type: "number" },
    { label: "Breadth", name: "breadth", type: "number" },
    {
      label: "Facing",
      name: "facing",
      type: "radio",
      options: ["EAST", "WEST", "NORTH", "SOUTH"],
    },
    { label: "Carpet Area", name: "carpetArea", type: "number" },
    { label: "Built-Up Area", name: "builtUpArea", type: "number" },
    {
      label: "Year of Construction",
      name: "yearOfConstruction",
      type: "number",
    },
    { label: "Age of the Property", name: "ageOfTheProperty", type: "number" },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-10">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
          {fields.map((formField) => (
            <FormField
              key={formField.name}
              control={form.control}
              name={formField.name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{formField.label}</FormLabel>
                  <FormControl>
                    {formField.type === "radio" ? (
                      <RadioGroup
                        value={field.value}
                        onValueChange={(value) => field.onChange(value)}
                        className="flex flex-row flex-wrap lg:flex-row lg:space-x-4"
                      >
                        {formField.options.map((option) => (
                          <div
                            key={option}
                            className="flex items-center space-x-2 self-center"
                          >
                            <RadioGroupItem value={option} id={option} />
                            <Label htmlFor={option}>{option}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    ) : (
                      <Input
                        type="number"
                        placeholder={`Enter ${formField.label}`}
                        {...field}
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
        {/* Submit Button */}
        <div className="mt-6 flex justify-between">
          <Button onClick={prevStep}>Previous</Button>
          <Button type="submit">Next</Button>
        </div>
      </form>
    </Form>
  );
};

export default AreaDetails;
