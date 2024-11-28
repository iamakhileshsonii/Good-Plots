import { useMemo } from "react";

const useFormatPrice = (price, unit = "L") => {
  return useMemo(() => {
    if (!price) return "";

    // Ensure the price is in numeric form, stripping commas if present
    const priceNum =
      typeof price === "string" ? parseInt(price.replace(/,/g, "")) : price;

    let formattedPrice = "";

    // Handle different units
    if (priceNum >= 10000000 && unit === "Cr") {
      // Convert to Crores (1 crore = 10,000,000)
      const crores = priceNum / 10000000;
      formattedPrice = `${crores} Cr`; // Formats as 1 Cr, 5.5 Cr, etc.
    } else if (priceNum >= 100000 && unit === "L") {
      // Convert to Lakhs (1 lakh = 100,000)
      const lakhs = priceNum / 100000;
      formattedPrice = `${lakhs} L`; // Formats as 10 L, 25 L, etc.
    } else if (priceNum >= 1000 && unit === "K") {
      // Convert to Thousands (1K = 1000)
      const thousands = priceNum / 1000;
      formattedPrice = `${thousands} K`; // Formats as 10K, 100K, etc.
    } else {
      formattedPrice = priceNum; // Return number if it's under 1000
    }

    return formattedPrice;
  }, [price, unit]);
};

export default useFormatPrice;
