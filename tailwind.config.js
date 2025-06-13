import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(0, 0%, 100%)",
        border: "hsl(0, 0%, 90%)",
        input: "hsl(0, 0%, 95%)",
        ring: "hsl(0, 0%, 80%)",
        foreground: "hsl(0, 0%, 10%)",
        primary: {
          DEFAULT: "hsl(240, 100%, 50%)",
          foreground: "hsl(0, 0%, 100%)",
        },
      },
      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem",
      },
    },
  },
  plugins: [],
};
export default config;
