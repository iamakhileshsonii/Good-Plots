import React, { useState } from "react";
import { submitInitialForm } from "../../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const InitialForm = () => {
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

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fields = {
      saleType,
      title,
      propertySubtype,
      description,
      address: {
        addressLine,
        city,
        state,
        pincode,
      },
      totalArea,
      expectedPrice,
      isNegotiable,
    };

    const data = await submitInitialForm(fields);
    if (data) {
      toast.success("Property submitted successfully");
      navigate("/dashboard/mylistings");
    } else {
      toast.error("Unable to submit the form");
    }
  };
  return (
    <div className="sm:py-10">
      <h2 className="sm:text-xl text-center font-bold text-red">
        Publish a property
      </h2>
      <form className="max-w-sm mx-auto sm:py-10" onSubmit={handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Property Title"
            required
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor="propertySubtype"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Property Subtype
          </label>
          <select
            id="propertySubtype"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => setPropertySubtype(e.target.value)}
            value={propertySubtype}
          >
            <option value="">Select a subtype</option>

            <option value="Residential Plot/ Land">
              Residential Plot/ Land
            </option>
            <option value="Independent House/ Villa/ Cottage/ Bungalow">
              Independent House/ Villa/ Cottage/ Bungalow
            </option>
            <option value="Apartment/ Studio Apartment/ Apartment Penthouse">
              Apartment/ Studio Apartment/ Apartment Penthouse
            </option>
            <option value="Independent Builder Floor">
              Independent Builder Floor
            </option>
            <option value="FarmHouse/ Country House">
              FarmHouse/ Country House
            </option>
            <option value="Holiday Home/ Guest House">
              Holiday Home/ Guest House
            </option>
          </select>
        </div>

        <div>
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <textarea
            id="description"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="3BHK fully furnished..."
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          ></textarea>
        </div>

        <div className="mb-5">
          <label
            htmlFor="addressLine"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Address Line
          </label>
          <input
            type="text"
            id="addressLine"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            onChange={(e) => setAddressLine(e.target.value)}
            value={addressLine}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="pincode"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Pincode
          </label>
          <input
            type="text"
            id="pincode"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            onChange={(e) => setPincode(e.target.value)}
            value={pincode}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="city"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            City
          </label>
          <input
            type="text"
            id="city"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            onChange={(e) => setCity(e.target.value)}
            value={city}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="state"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            State
          </label>
          <input
            type="text"
            id="state"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            onChange={(e) => setState(e.target.value)}
            value={state}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="totalArea"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Total Area
          </label>
          <input
            type="text"
            id="totalArea"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            onChange={(e) => setTotalArea(e.target.value)}
            value={totalArea}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="expectedPrice"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Expected Price
          </label>
          <input
            type="text"
            id="expectedPrice"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            onChange={(e) => setExpectedPrice(e.target.value)}
            value={expectedPrice}
          />
        </div>

        <div className="py-5">
          <label
            htmlFor="isNegotiable"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Negotiable
          </label>
          <div className="flex">
            <div className="flex items-center me-4">
              <input
                id="inline-radio-yes"
                type="radio"
                value="yes"
                name="inline-radio-group"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onChange={(e) => setIsNegotiable(e.target.value)}
              />
              <label
                htmlFor="inline-radio-yes"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Yes
              </label>
            </div>
            <div className="flex items-center me-4">
              <input
                id="inline-radio-no"
                type="radio"
                value="no"
                name="inline-radio-group"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onChange={(e) => setIsNegotiable(e.target.value)}
              />
              <label
                htmlFor="inline-radio-no"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                No
              </label>
            </div>
          </div>
        </div>

        <div className="py-5">
          <label
            htmlFor="saleType"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Negotiable
          </label>
          <div className="flex">
            <div className="flex items-center me-4">
              <input
                id="saleType-rent"
                type="radio"
                value="rent"
                name="saleType-group"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onChange={(e) => setSaleType(e.target.value)}
              />
              <label
                htmlFor="saleType-rent"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Rent
              </label>
            </div>
            <div className="flex items-center me-4">
              <input
                id="saleType-sale"
                type="radio"
                value="sale"
                name="saleType-group"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onChange={(e) => setSaleType(e.target.value)}
              />
              <label
                htmlFor="saleType-rent"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Sale
              </label>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="bg-red  text-white sm:w-full hover:bg-red-dark duration-700 hover:shadow-2xl bg-black font-medium rounded-lg text-sm  px-5 py-2.5 text-center"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default InitialForm;
