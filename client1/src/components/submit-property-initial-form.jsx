import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Form Imports
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { publishNewProperty } from "@/services/propertyApi";

// Form Schema
const formSchema = z.object({
  title: z.string().min(2).max(50),
  propertySubtype: z.string().min(1, "Please select a property subtype"),
  description: z.string().min(2).max(100),
  address: z.object({
    addressLine: z.string().min(5).max(80),
    city: z.string().min(2).max(50),
    state: z.string().min(2).max(50),
    pincode: z.preprocess(
      (value) => (typeof value === "string" ? parseInt(value, 10) : value),
      z.number().min(1, "Pincode is required")
    ),
  }),
  isNegotiable: z.preprocess((value) => value === "yes", z.boolean()),
  totalArea: z.preprocess(
    (value) => (typeof value === "string" ? parseFloat(value) : value),
    z.number().min(2, "Total area is required")
  ),
  expectedPrice: z.preprocess(
    (value) => (typeof value === "string" ? parseFloat(value) : value),
    z.number().min(4, "Expected price is required")
  ),
});

// Form Component
const SubmitPropertyInitialForm = () => {
  // Default Values
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      propertySubtype: "",
      description: "",
      address: {
        addressLine: "",
        city: "",
        state: "",
        pincode: "",
      },
      isNegotiable: false,
      totalArea: "",
      expectedPrice: "",
    },
  });

  // On Submit Form
  const onSubmit = async (values) => {
    console.log("Property submmited with details: ", values);
    try {
      const res = await publishNewProperty(values);

      if (res) {
        console.log("PROPERTY PUBLISHED: ", res);
      } else {
        console.log("CANNOT PUBLISH PROPERTY");
      }
    } catch (error) {
      console.error("Unable to publish property");
    }
  };

  const {
    formState: { errors },
  } = form;

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Publish Property</CardTitle>
        <CardDescription>Publish a new property</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter title" {...field} />
                  </FormControl>
                  <FormMessage>{errors.title?.message}</FormMessage>
                </FormItem>
              )}
            />

            {/* Property Subtype */}
            <FormField
              control={form.control}
              name="propertySubtype"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Property Subtype</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="block w-full rounded-md border border-gray-300 p-2 text-gray-900 focus:ring focus:ring-indigo-500"
                    >
                      <option value="">Select subtype</option>
                      <option value="residential">Residential</option>
                      <option value="commercial">Commercial</option>
                      <option value="industrial">Industrial</option>
                      <option value="land">Land</option>
                    </select>
                  </FormControl>
                  <FormMessage>{errors.propertySubtype?.message}</FormMessage>
                </FormItem>
              )}
            />

            {/* Property Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <textarea
                      {...field}
                      placeholder="Describe your property"
                      className="block w-full rounded-md border border-gray-300 p-2 text-gray-900 focus:ring focus:ring-indigo-500"
                    />
                  </FormControl>
                  <FormMessage>{errors.description?.message}</FormMessage>
                </FormItem>
              )}
            />

            {/* Address Line */}
            <FormField
              control={form.control}
              name="address.addressLine"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter property address" {...field} />
                  </FormControl>
                  <FormMessage>
                    {errors.address?.addressLine?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            {/* State */}
            <FormField
              control={form.control}
              name="address.state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input placeholder="Chandigarh" {...field} />
                  </FormControl>
                  <FormMessage>{errors.address?.state?.message}</FormMessage>
                </FormItem>
              )}
            />
            {/* City */}
            <FormField
              control={form.control}
              name="address.city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="Chandigarh" {...field} />
                  </FormControl>
                  <FormMessage>{errors.address?.city?.message}</FormMessage>
                </FormItem>
              )}
            />
            {/* Pincode */}
            <FormField
              control={form.control}
              name="address.pincode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>pincode</FormLabel>
                  <FormControl>
                    <Input placeholder="134109" {...field} />
                  </FormControl>
                  <FormMessage>{errors.address?.pincode?.message}</FormMessage>
                </FormItem>
              )}
            />
            {/* Total Area */}
            <FormField
              control={form.control}
              name="totalArea"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Area</FormLabel>
                  <FormControl>
                    <Input placeholder="1322" {...field} />
                  </FormControl>
                  <FormMessage>{errors?.totalArea?.message}</FormMessage>
                </FormItem>
              )}
            />
            {/* Expected Price */}
            <FormField
              control={form.control}
              name="expectedPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expected Price</FormLabel>
                  <FormControl>
                    <Input placeholder="12000000" {...field} />
                  </FormControl>
                  <FormMessage>{errors.expectedPrice?.message}</FormMessage>
                </FormItem>
              )}
            />

            {/* Is Negotiable */}
            <FormField
              control={form.control}
              name="isNegotiable"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Is Negotiable?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      value={field.value ? "yes" : "no"} // Convert boolean to string for display
                      onValueChange={(value) => field.onChange(value === "yes")} // Convert string to boolean for state
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="yes"
                          id="yes"
                          className="form-radio"
                        />
                        <Label htmlFor="yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="no"
                          id="no"
                          className="form-radio"
                        />
                        <Label htmlFor="no">No</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage>{errors.isNegotiable?.message}</FormMessage>
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SubmitPropertyInitialForm;
