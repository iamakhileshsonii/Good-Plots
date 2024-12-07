import React, { useEffect, useState } from "react";
import useKyc from "../../../../zustand/useKyc";
import {
  isAllImagesUploaded,
  isValidImage,
} from "../../../../utils/validation";
import {
  propertyKyc,
  uploadPropertyKycImages,
} from "../../../../services/propertyApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const PropertyImages = ({ setLoading, propertyId }) => {
  const navigate = useNavigate();
  const { updateKycFormData, kycData } = useKyc();
  const [errors, setErrors] = useState({});
  const [isFormFilled, setIsFormFilled] = useState(true);

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
      setIsFormFilled(true);
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

        // updateKycFormData("propertyImages", formData);
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
      setLoading(true); // Show loading indicator
      const images = await uploadPropertyKycImages(formData); // Upload images

      if (images && images.data) {
        console.log("IMAGES RECEIVED: ", images.data);

        await updateKycFormData("propertyImages", images.data); // Update global state if required
        const isKycDone = await propertyKyc(kycData, propertyId);
        if (isKycDone) {
          console.log("PROPERTY KYC SUCCESSFULL 👌", isKycDone);
        }
        navigate("/dashboard/mylistings");
        // Show success message
        toast.success("Images uploaded successfully!");

        updateKycFormData("kycData", {}); // Optionally, clear other KYC data as needed
      } else {
        throw new Error("No images returned from the server");
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error("Failed to upload images. Please try again.");
    } finally {
      setLoading(false); // Hide loading indicator
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
