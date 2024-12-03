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
