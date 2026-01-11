import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          brand: '#00CCBC',  // Deliveroo Main Color
          dark: '#00b8a9',   // Darker shade for buttons
        },
      },
    },
  },
  plugins: [],
};
export default config;