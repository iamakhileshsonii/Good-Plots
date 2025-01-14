import React, { useState, useEffect } from "react";

const WelcomeText = () => {
  const [currentText, setCurrentText] = useState(
    "Explore the best properties near you"
  );
  const texts = [
    "Discover your dream property",
    "Easy, Fast, and Secure Deals",
    "Let's find your next home",
    "Simplifying property searches",
    "Where dreams meet reality",
    "Finding your perfect plot",
    "Your journey to homeownership starts here",
    "Explore the best properties near you",
    "From house hunting to home sweet home",
    "Turning transactions into relationships",
    "Unlock the door to your new life",
    "Transparent deals, trusted service",
    "GoodPlots, your trusted partner in real estate",
    "Redefining the property-buying experience",
    "Property solutions tailored for you",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => {
        const currentIndex = texts.indexOf(prev);
        return texts[(currentIndex + 1) % texts.length];
      });
    }, 3000); // Change text every 3 seconds
    return () => clearInterval(interval);
  }, [texts]);

  return (
    <div className="moving-text">
      <p className="animated-text text-xl font-bold text-white dark:text-white">
        Welcome to <span className="text-red-500"> GoodPlots</span>
      </p>
      <span className="animated-text text-3xl font-bold text-white dark:text-white">
        {currentText}
      </span>
    </div>
  );
};

export default WelcomeText;
