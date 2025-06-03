import useKyc from "@/context/useKyc";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import {
  applyPropertyKYC,
  uploadPropertyKycImages,
} from "@/services/propertyApi";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useParams } from "react-router-dom";

const PropertyImages = () => {
  const [loading, setLoading] = useState(false);
  const [isImagesUploaded, setIsImagesUploaded] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const params = useParams();

  console.log("PROPERTY ID: ", params.id);

  const {
    updateKycFormData,
    kycData,
    currentStep,
    nextStep,
    prevStep,
    submitKyc,
  } = useKyc();

  const formSchema = z.object({
    siteView: z.instanceof(File).optional(),
    materPlan: z.instanceof(File).optional(),
    location: z.instanceof(File).optional(),
    map: z.instanceof(File).optional(),
    otherPhoto: z.instanceof(File).optional(),
    exteriorView: z.instanceof(File).optional(),
    livingRoom: z.instanceof(File).optional(),
    bedroomsImage: z.instanceof(File).optional(),
    kitchen: z.instanceof(File).optional(),
    floorPlan: z.instanceof(File).optional(),
  });

  const propertyImageForm = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {}, // Add any default file values here if needed
  });

  const { control, handleSubmit, setValue, getValues } = propertyImageForm;

  const fields = [
    { id: 1, label: "Site View", name: "siteView", type: "file" },
    { id: 2, label: "Master Plan", name: "materPlan", type: "file" },
    { id: 3, label: "Location", name: "location", type: "file" },
    { id: 4, label: "Map", name: "map", type: "file" },
    { id: 5, label: "Other Photo", name: "otherPhoto", type: "file" },
    { id: 6, label: "Exterior View", name: "exteriorView", type: "file" },
    { id: 7, label: "Living Room", name: "livingRoom", type: "file" },
    { id: 8, label: "Bedrooms Image", name: "bedroomsImage", type: "file" },
    { id: 9, label: "Kitchen", name: "kitchen", type: "file" },
    { id: 10, label: "Floor Plan", name: "floorPlan", type: "file" },
  ];

  const handleChanges = (e, fieldName) => {
    const file = e.target.files[0]; // Access the selected file
    if (file) {
      setValue(fieldName, file); // Update the react-hook-form field with the file
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const uploadImage = await uploadPropertyKycImages(data);

      if (uploadImage) {
        toast({
          title: "Property KYC uploaded",
          description:
            "All the property images uploaded successfully, please submit the form to send the KYC to GOODPLOTS administrative for moderation.",
        });

        await updateKycFormData("propertyImages", uploadImage);

        setIsImagesUploaded(true);
      } else {
        toast({
          title: "Unable to upload images",
          description:
            "Something went wrong while uplaoding image. GoodPlots team is working on it",
          variant: "destructive",
        });
      }
    } catch (error) {
      setLoading(false);
      console.error("Something went wrong while uploading images", error);
    } finally {
      setLoading(false);
    }
  };

  const applyKyc = async () => {
    await applyPropertyKYC(kycData, params.id);
    navigate("/account/kyc-successfull");
  };

  return (
    <Form {...propertyImageForm}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 p-2">
          {fields.map((formField) => (
            <FormField
              key={formField.id}
              control={control}
              name={formField.name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{formField.label}</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      onChange={(e) => handleChanges(e, formField.name)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
        {isImagesUploaded ? (
          <Button onClick={applyKyc}>Apply KYC</Button>
        ) : (
          <Button type="submit">Upload</Button>
        )}
      </form>
    </Form>
  );
};

export default PropertyImages;
