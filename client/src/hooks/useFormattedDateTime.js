// useFormattedDateTime.js
import { useState, useEffect } from "react";

const useFormattedDateTime = (date = new Date(), options = {}) => {
  const [formattedDateTime, setFormattedDateTime] = useState("");

  useEffect(() => {
    if (!date) {
      setFormattedDateTime("");
      return;
    }

    // Default formatting options
    const defaultOptions = {
      year: "numeric",
      month: "long", // e.g., August
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false, // 24-hour format
    };

    // Merge default options with user-provided options
    const formatOptions = { ...defaultOptions, ...options };

    // Create a formatter with the specified locale and options
    const formatter = new Intl.DateTimeFormat("en-US", formatOptions);

    // Convert the input to a Date object
    const dateObj = new Date(date);

    // Check if the date is valid
    if (isNaN(dateObj)) {
      setFormattedDateTime("Invalid Date");
    } else {
      setFormattedDateTime(formatter.format(dateObj));
    }
  }, [date, options]);

  return formattedDateTime;
};

export default useFormattedDateTime;
