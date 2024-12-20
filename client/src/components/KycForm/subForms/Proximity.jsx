import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useKyc from "@/context/useKyc";

const Proximity = () => {
  const {
    updateKycFormData,
    kycData,
    currentStep,
    nextStep,
    prevStep,
    submitKyc,
  } = useKyc();

  const fields = [
    { label: "Market", name: "market", type: "select" },
    {
      label: "Inter State Bus Terminal",
      name: "interStateBusTerminal",
      type: "select",
    },
    { label: "Sr Secondary School", name: "srSecondarySchool", type: "select" },
    { label: "University", name: "university", type: "select" },
    {
      label: "Military Contonment",
      name: "militaryContonment",
      type: "select",
    },
    { label: "Fire Station", name: "fireStation", type: "select" },
    { label: "Bar And Restaurants", name: "barAndRestaurants", type: "select" },
    { label: "Shopping Mall", name: "shoppingMall", type: "select" },
    { label: "Cinema", name: "cinema", type: "select" },
    {
      label: "Public Swimming Pool",
      name: "publicSwimmingPool",
      type: "select",
    },
    { label: "Club", name: "club", type: "select" },
    { label: "Town Park", name: "townPark", type: "select" },
    { label: "Golf Course", name: "golfCourse", type: "select" },
    { label: "Liquor Shop", name: "liquorShop", type: "select" },
  ];

  // Shared options for all select fields
  const options = [
    0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
  ];

  const formSchema = z.object({
    //Empty Form Validation
  });

  const proximityForm = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      market: 0.1,
      interStateBusTerminal: 0.1,
      srSecondarySchool: 0.1,
      university: 0.1,
      militaryContonment: 0.1,
      fireStation: 0.1,
      barAndRestaurants: 0.1,
      shoppingMall: 0.1,
      cinema: 0.1,
      publicSwimmingPool: 0.1,
      club: 0.1,
      townPark: 0.1,
      golfCourse: 0.1,
      liquorShop: 0.1,
    },
  });

  const onSubmit = async () => {
    await updateKycFormData("proximityDetails", proximityForm.getValues());
    nextStep();
  };
  return (
    <Form {...proximityForm}>
      <form
        onSubmit={proximityForm.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {fields.map((fieldConfig) => (
            <FormField
              key={fieldConfig.name}
              control={proximityForm.control}
              name={fieldConfig.name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{fieldConfig.label}</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value.toString()}
                      onValueChange={(value) => field.onChange(Number(value))}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder={`Select ${fieldConfig.label}`}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {options.map((option) => (
                          <SelectItem
                            key={`${fieldConfig.name}-${option}`}
                            value={option.toString()}
                          >
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
        <div className="mt-6">
          <Button onClick={prevStep}>Previous</Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
};

export default Proximity;
