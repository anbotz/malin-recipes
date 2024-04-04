/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        forest: {
          ...require("daisyui/src/theming/themes")["forest"],
          "--rounded-btn": "0.5rem", // border radius rounded-btn utility class, used in buttons and similar element
        },
      },
      "lemonade",
    ],
  },
};
