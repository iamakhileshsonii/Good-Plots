module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      colors: {
        red: {
          dark: "#7e0000",
          DEFAULT: "#b40000",
          light: "#e53737",
          "light-1": "#ffe0e0",
        },
        green: "#00a300",
        orange: "#fea400",
        bordercolor: "#C7C7C7",
        cardbg: "#f6f6f6",
        lightText: "#969696",
        black: {
          dark: "#000000",
          DEFAULT: "#858585",
          light: "#dfdfdf",
        },
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [
    require("flowbite/plugin"),
    function ({ addBase, theme }) {
      addBase({
        "*": { fontFamily: theme("fontFamily.roboto") },
      });
    },
    require("daisyui"),
  ],
  daisyui: {
    themes: false, // Only use your custom colors and styles
    darkTheme: "dark",
    base: false, // Disable DaisyUI base styles
    styled: false, // Prevent DaisyUI from applying its component styles
    utils: true, // Keep utility classes enabled
    prefix: "", // No prefix for DaisyUI classnames
    logs: true, // Show DaisyUI config logs in the console
    themeRoot: ":root", // The element that receives theme color CSS variables
  },
};
