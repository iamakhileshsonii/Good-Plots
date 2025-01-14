import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { z } from "zod";
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
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const formSchema = z.object({});

export default function AgreementDocs() {
  //Agreement Doc Form default values
  const agreementDocForm = useForm({
    resolver: zodResolver(formSchema),
    default: {
      tokenAgreement: "",
      earnestMoneyAgreement: "",
      saleDeedAgreement: "",
    },
  });

  //handle form submission
  const onSubmit = async () => {
    console.log("AGREEMENT DOCS: ", agreementDocForm.getValues());
  };

  //Form fields
  const fields = [
    { id: 1, label: "Token Agreement", name: "tokenAgreement", type: "file" },
    {
      id: 2,
      label: "Earnest Money Agreement",
      name: "earnestMoneyAgreement",
      type: "file",
    },
    { id: 3, label: "Sale Deed", name: "saleDeedAgreement", type: "file" },
  ];

  //handle onChange
  const handleOnchange = async (e, fieldName) => {
    const file = e.target.files[0];

    if (file) {
      agreementDocForm.setValue(fieldName, file);
    }

    console.log("FILE ON CHANGE: ", file);
  };

  return (
    <Form {...agreementDocForm}>
      <form
        onSubmit={agreementDocForm.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-10">
          {fields.map((formField) => (
            <FormField
              key={formField.id}
              control={agreementDocForm.control}
              name={formField.name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{formField.label}</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      onChange={(e) => handleOnchange(e, formField.name)}
                      single
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        <Button type="submit">Apply</Button>
      </form>
    </Form>
  );
}
