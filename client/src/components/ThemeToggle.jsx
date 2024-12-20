import { useEffect, useState } from "react";
import { Switch } from "./ui/switch";

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }
  }, []);

  const toggleTheme = (checked) => {
    setIsDarkMode(checked);
    document.documentElement.classList.toggle("dark", checked);
    localStorage.setItem("theme", checked ? "dark" : "light");
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="text-black dark:text-secondary-foreground">
        {isDarkMode ? "Dark Mode" : "Light Mode"}
      </span>
      <Switch
        checked={isDarkMode}
        onCheckedChange={toggleTheme} // Handle the toggle change
        className="bg-primary text-primary-foreground dark:bg-secondary dark:text-secondary-foreground"
      />
    </div>
  );
};

export default ThemeToggle;
