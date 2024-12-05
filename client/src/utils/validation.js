/**
 * Validates if all fields in an object are non-empty.
 * @param {Object} data - The object containing form fields.
 * @returns {boolean} - True if all fields are filled, otherwise false.
 */

export const isFormComplete = async (data) => {
  return Object.values(data).every((value) => value.trim() !== "");
};

export const validateField = (value, type) => {
  // Trim the value to remove leading and trailing spaces
  const trimmedValue = value.trim();

  // Check if the field is empty
  if (!trimmedValue) return false; // This returns false if the value is empty after trimming

  // Number-specific validation
  if (type === "number") {
    return !isNaN(trimmedValue) && !isNaN(parseFloat(trimmedValue));
  }

  // Text-specific validation (only alphabetic characters and spaces)
  if (type === "text") {
    const textPattern = /^[A-Za-z\s]+$/; // Matches only alphabets and spaces
    return textPattern.test(trimmedValue);
  }

  // Email-specific validation
  if (type === "email") {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
    return emailPattern.test(trimmedValue);
  }

  // If no type matches, return true (or add more types as needed)
  return true;
};

export const isValidImage = async (file) => {
  const validFormats = ["image/png", "image/jpeg"]; // This should be an array
  const maxSize = process.env.REACT_APP_MAX_IMAGE_UPLOAD_SIZE;
  const maxSizeInBytes = maxSize * 1024 * 1024; // Convert MB to bytes

  if (!validFormats.includes(file.type)) {
    return {
      isValid: false,
      message: "Invalid file format. Please upload PNG or JPEG",
    };
  }

  if (file.size > maxSizeInBytes) {
    return { isValid: false, message: `File size exceeds ${maxSize}MB` };
  }

  // If the format and size are valid
  return { isValid: true, message: "Valid image" };
};

/**
 * Validates if all image fields in the form data are non-empty and valid images.
 * @param {Object} data - The object containing form fields with file objects.
 * @returns {boolean} - True if all fields are non-empty and valid, otherwise false.
 */
export const isAllImagesUploaded = async (data) => {
  const validFormats = ["image/png", "image/jpeg"];
  const maxSize = process.env.REACT_APP_MAX_IMAGE_UPLOAD_SIZE;
  const maxSizeInBytes = maxSize * 1024 * 1024; // Convert MB to bytes

  for (const [key, value] of Object.entries(data)) {
    if (!value) return false; // Check if the field is empty

    // Validate file type and size
    if (!validFormats.includes(value.type)) {
      console.error(`Invalid file format for ${key}`);
      return false;
    }
    if (value.size > maxSizeInBytes) {
      console.error(`File size exceeds ${maxSize}MB for ${key}`);
      return false;
    }
  }

  return true; // All fields are non-empty and valid
};
