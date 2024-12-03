import React, { useState } from "react";
import { submitInitialForm } from "../../services/api";
import { addNewProperty } from "../../services/propertyApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const InitialForm = () => {
  const navigate = useNavigate();

  const [saleType, setSaleType] = useState("");
  const [title, setTitle] = useState("");
  const [propertySubtype, setPropertySubtype] = useState("");
  const [description, setDescription] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [isNegotiable, setIsNegotiable] = useState("");
  const [pincode, setPincode] = useState("");
  const [totalArea, setTotalArea] = useState("");
  const [expectedPrice, setExpectedPrice] = useState("");

  const [formData, setFormData] = useState({
    saleType: "",
    title: "",
    propertySubtype: "",
    description: "",
    addressLine: "",
    city: "",
    state: "",
    isNegotiable: "",
    pincode: "",
    totalArea: "",
    expectedPrice: "",
  });

  const formFields = [
    {
      id: 1,
      title: "Sale Type",
      name: "saleType",
      type: "select",
      options: [
        "Residential Plot/ Land",
        "Independent House/ Villa/ Cottage/ Bungalow",
        "Apartment/ Studio Apartment/ Apartment Penthouse",
        "Independent Builder Floor",
        "FarmHouse/ Country House",
        "Holiday Home/ Guest House",
      ],
    },
    { id: 2, title: "Property Title", name: "title", type: "text" },
    { id: 3, title: "Property Subtype", name: "propertySubtype", type: "text" },
    { id: 4, title: "Description", name: "description", type: "text" },
    { id: 5, title: "Address Line", name: "addressLine", type: "text" },
    { id: 6, title: "City", name: "city", type: "text" },
    { id: 7, title: "State", name: "state", type: "text" },
    {
      id: 8,
      title: "Is Negotiable",
      name: "isNegotiable",
      type: "radio",
      options: ["yes", "no"],
    },
    { id: 9, title: "Pincode", name: "pincode", type: "number" },
    { id: 10, title: "Total Area [Sq.Ft.]", name: "totalArea", type: "number" },
    {
      id: 11,
      title: "Expected Price [INR]",
      name: "expectedPrice",
      type: "number",
    },
  ];

  const handleOnchange = async (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const fields = {
    //   saleType,
    //   title,
    //   propertySubtype,
    //   description,
    //   address: {
    //     addressLine,
    //     city,
    //     state,
    //     pincode,
    //   },
    //   totalArea,
    //   expectedPrice,
    //   isNegotiable,
    // };

    console.log("FORM SUBMITTED WITH: ", formData);
    const property = await addNewProperty(formData);
    if (property) {
      toast.success("🏠 New property published");
      navigate("/dashboard/mylistings");
    }
    // const data = await submitInitialForm(fields);
    // if (data) {
    //   toast.success("Property submitted successfully");
    //   navigate("/dashboard/mylistings");
    // } else {
    //   toast.error("Unable to submit the form");
    // }

    console.log("FORM SUBMITTED WITH: ", formData);
  };
  return (
    <div className="sm:py-10">
      <h2 className="sm:text-xl text-center font-bold text-red">
        Publish a property
      </h2>
      <form className="max-w-sm mx-auto sm:py-10" onSubmit={handleSubmit}>
        {formFields.map((field) => (
          <div className="mb-5">
            <label
              htmlFor={field.name}
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              {field.title}
            </label>
            {field.type === "select" ? (
              <select
                id={field.name}
                name={field.name}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={formData[field.name]}
                onChange={handleOnchange}
              >
                <option value="">Select sale type</option>
                {field.options.map((option, index) => (
                  <option key={index} value={option} className="text-black">
                    {option}
                  </option>
                ))}
              </select>
            ) : field.type === "radio" ? (
              <div className="flex">
                {field.options.map((option, index) => (
                  <div className="flex items-center me-4" key={index}>
                    <label
                      key={index}
                      className="inline-flex items-center mr-4"
                    >
                      <input
                        type="radio"
                        name={field.name}
                        value={option}
                        checked={formData[field.name] === option}
                        onChange={handleOnchange}
                        className="form-radio"
                      />
                      <span className="ml-2">{option}</span>
                    </label>
                  </div>
                ))}
              </div>
            ) : (
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={`Enter ${field.title}`}
                onChange={handleOnchange}
                required
              />
            )}
          </div>
        ))}

        <button
          type="submit"
          className="bg-red  text-white sm:w-full hover:bg-red-dark duration-700 hover:shadow-2xl font-medium rounded-lg text-sm  px-5 py-2.5 text-center"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default InitialForm;
