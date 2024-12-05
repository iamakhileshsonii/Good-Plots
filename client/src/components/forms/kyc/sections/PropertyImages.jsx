import React, { useEffect, useState } from "react";
import useKyc from "../../../../zustand/useKyc";
import {
  isAllImagesUploaded,
  isValidImage,
} from "../../../../utils/validation";
import { propertyKyc } from "../../../../services/propertyApi";

const PropertyImages = () => {
  const { updateKycFormData, kycData } = useKyc();
  const [errors, setErrors] = useState({});
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [formData, setFormData] = useState(
    kycData.propertyImages || {
      siteView: "",
      materPlan: "",
      location: "",
      map: "",
      otherPhoto: "",
      exteriorView: "",
      livingRoom: "",
      bedroomsImage: "",
      kitchen: "",
      floorPlan: "",
    }
  );

  const fields = [
    { id: 1, label: "Site View", name: "siteView", type: "file" },
    { id: 2, label: "Mater Plan", name: "materPlan", type: "file" },
    { id: 3, label: "Location", name: "location", type: "file" },
    { id: 4, label: "Map", name: "map", type: "file" },
    { id: 5, label: "Other Photo", name: "otherPhoto", type: "file" },
    { id: 6, label: "Exterior View", name: "exteriorView", type: "file" },
    { id: 7, label: "Living Room", name: "livingRoom", type: "file" },
    { id: 8, label: "Bedrooms Image", name: "bedroomsImage", type: "file" },
    { id: 9, label: "Kitchen", name: "kitchen", type: "file" },
    { id: 10, label: "Floor Plan", name: "floorPlan", type: "file" },
  ];

  // Image preview state
  const [previewImages, setPreviewImages] = useState(() => {
    // Load initial preview images from localStorage
    const savedPreviews = JSON.parse(localStorage.getItem("previewImages"));
    return savedPreviews || {};
  });

  // Check if the form is complete
  useEffect(() => {
    const checkFormCompletion = async () => {
      const complete = await isAllImagesUploaded(formData);
      console.log("Check All Images Uploaded: ", complete);
      const error = Object.values(errors).some((error) => error);
      setIsFormFilled(complete && !error);
    };

    checkFormCompletion();
  }, [formData, errors]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const { name } = event.target;

    if (file) {
      const validationResult = isValidImage(file);
      if (validationResult) {
        // Update the form data and preview
        const previewUrl = URL.createObjectURL(file);
        setFormData((prev) => ({
          ...prev,
          [name]: file,
        }));

        setPreviewImages((prev) => {
          const updatedPreviews = { ...prev, [name]: previewUrl };
          localStorage.setItem(
            "previewImages",
            JSON.stringify(updatedPreviews)
          );
          return updatedPreviews;
        });

        updateKycFormData("propertyImages", formData);
      } else {
        setErrors((prev) => ({
          ...prev,
          [name]: "Invalid file type or size",
        }));
      }
    }
  };

  const submitKycForm = async () => {
    try {
      const propertyId = "6711f081a5499113228ec3c7";
      const res = await propertyKyc(kycData, propertyId);
      console.log("KYC form submitted", kycData);
      localStorage.removeItem("previewImages");
    } catch (error) {
      console.log("Something went wrong while submitting kyc form");
    }
  };

  return (
    <div>
      <h4 className="font-semibold text-lg text-center">Property Images</h4>
      <div className="flex flex-wrap gap-4">
        {fields.map((field) => (
          <div key={field.id}>
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor={field.name}
            >
              Upload {field.label}
            </label>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id={field.name}
              name={field.name}
              type={field.type}
              onChange={(e) => handleFileChange(e)}
            />
            {errors[field.name] && (
              <p className="mt-1 text-sm text-red-500">{errors[field.name]}</p>
            )}
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
              PNG, JPG or (MAX. 2MB).
            </p>

            {/* Preview the selected image */}
            {previewImages[field.name] && (
              <div className="mt-2">
                <img
                  src={previewImages[field.name]}
                  alt={`Preview of ${field.label}`}
                  className="w-32 h-32 object-cover border rounded-lg"
                />
              </div>
            )}
          </div>
        ))}
      </div>
      {isFormFilled ? (
        <div className="flex justify-end">
          <button
            className="w-20 h-8 text-sm text-white px-4 py-2 rounded-md bg-red-dark"
            onClick={submitKycForm}
          >
            Submit
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default PropertyImages;
