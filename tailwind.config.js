/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // https://uicolors.app/edit?sv1=kb:50-fff5eb/100-feebd7/200-fad1ad/300-f4b27b/400-eb894c/500-e3733b/600-cc5428/700-a54227/800-823b2b/900-653329;kt:50-eddecf/100-e7d4c1/200-d9bba0/300-ca9c77/400-ba784f/500-ad6643/600-8c503b/700-6f3d2f/800-55322a/900-3f2621
        kb: {
          50: "#fff5eb",
          100: "#feebd7",
          200: "#fad1ad",
          300: "#f4b27b",
          400: "#eb894c",
          500: "#e3733b",
          600: "#cc5428",
          700: "#a54227",
          800: "#823b2b",
          900: "#653329",
        },
        kt: {
          50: "#eddecf",
          100: "#e7d4c1",
          200: "#d9bba0",
          300: "#ca9c77",
          400: "#ba784f",
          500: "#ad6643",
          600: "#8c503b",
          700: "#6f3d2f",
          800: "#55322a",
          900: "#3f2621",
        },
      },
    },
  },
  plugins: [],
};
