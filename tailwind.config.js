/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        /* Base */
        white: "#FFFFFF",
        black: "#000000",

        /* Purple */
        purple: {
          800: "#393A4B",
          700: "#4D5067",
          600: "#5B5E7E",
          300: "#C8CBE7",
          100: "#E3E4F1",
        },

        /* Gray */
        gray: {
          600: "#9495A5",
          300: "#D1D2DA",
          50: "#FAFAFA",
        },

        /* Navy */
        navy: {
          950: "#171823",
          900: "#25273D",
          850: "#494C6B",
        },

        /* Blue */
        blues: {
          500: "#3A7CFD",
        },
      },

      backgroundImage: {
        "gradient-1": "linear-gradient(135deg, #55DDFF, #C058F3)",
        "gradient-2": "linear-gradient(135deg, #3710BD, #A42395)",
      },
    },
  },
  plugins: [],
};
