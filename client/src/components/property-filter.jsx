import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Checkbox } from "./ui/checkbox";

const formSchema = z.object({});

export default function PropertyFilter({ setFilterOpen }) {
  //Default Values
  const filterForm = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const onSubmit = async () => {
    console.log("Filter Form", filterForm.getValues());
    setFilterOpen(false);
  };

  //Sale Type
  const saleType = [
    { id: 1, label: "Rent", name: "rent", type: "checkbox" },
    { id: 2, label: "Sale", name: "sale", type: "checkbox" },
  ];

  //Amenities
  const amenities = [
    { id: 1, label: "Gas Pipeline", name: "gasPipeline", type: "checkbox" },
    { id: 2, label: "Swimming Pool", name: "swimmingPool", type: "checkbox" },
    { id: 3, label: "Gym", name: "Gym", type: "checkbox" },
    { id: 4, label: "Lift", name: "Lift", type: "checkbox" },
    { id: 5, label: "Gated Society", name: "gatedSociety", type: "checkbox" },
    { id: 6, label: "Parking", name: "Parking", type: "checkbox" },
    { id: 7, label: "Club House", name: "clubHouse", type: "checkbox" },
  ];

  //Facing
  const facing = [
    { id: 1, label: "East", name: "east", type: "checkbox" },
    { id: 2, label: "West", name: "west", type: "checkbox" },
    { id: 3, label: "North", name: "north", type: "checkbox" },
    { id: 4, label: "South", name: "south", type: "checkbox" },
    { id: 5, label: "North-East", name: "north-east", type: "checkbox" },
    { id: 6, label: "North-West", name: "north-west", type: "checkbox" },
    { id: 7, label: "South-East", name: "south-east", type: "checkbox" },
    { id: 8, label: "South-West", name: "south-west", type: "checkbox" },
  ];

  return (
    <div>
      <Form {...filterForm}>
        <form
          onSubmit={filterForm.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          {/* SALE TYPE */}
          <div className="my-2">
            <h4 className="text-black dark:text-white py-4 font-semibold text-md underline underline-offset-2">
              Sale Type
            </h4>
            <div className="flex flex-wrap gap-4">
              {saleType.map((formField, index) => (
                <FormField
                  key={index}
                  control={filterForm.control}
                  name={formField.name}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="px-1 text-black dark:text-white">
                        {formField.label}
                      </FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </div>

          {/* AMENITITES */}
          <div className="my-2">
            <h4 className="text-black dark:text-white py-4 font-semibold text-md underline underline-offset-2">
              Amenities
            </h4>
            <div className="flex flex-wrap gap-4">
              {amenities.map((formField, index) => (
                <FormField
                  key={index}
                  control={filterForm.control}
                  name={formField.name}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className=" px-1 text-black dark:text-white">
                        {formField.label}
                      </FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </div>

          {/* FACING */}
          <div className="my-2">
            <h4 className="text-black dark:text-white py-4 font-semibold text-md underline underline-offset-2">
              Facing
            </h4>
            <div className="flex flex-wrap gap-4">
              {facing.map((formField, index) => (
                <FormField
                  key={index}
                  control={filterForm.control}
                  name={formField.name}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="px-1 text-black dark:text-white">
                        {formField.label}
                      </FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button type="submit">Apply Filter</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
