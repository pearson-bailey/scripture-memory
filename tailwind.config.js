/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
];
export const theme = {
  extend: {
    colors: {
      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",
      btn: {
        background: "hsl(var(--btn-background))",
        "background-hover": "hsl(var(--btn-background-hover))",
      },
    },
  },
  fontFamily: {
    primary: "var(--font-primary)",
    secondary: "var(--font-secondary)",
  },
};
export const plugins = [require("@headlessui/tailwindcss")];
