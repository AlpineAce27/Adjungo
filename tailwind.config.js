/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      AJGO_DarkSlateGray: "#283B36",
      AJGO_Platnum: "#DADADA",
      ADJO_Keppel: "#08BFA1",
      ADJO_Celeste: "#BDF3E7",
      ADJO_White: "FFFFFF",
    },
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
      rubik: ["Rubik", "sans-serif"]
    },
    extend: {
      customHeader: "bg-red"
    },
    plugins: [],
  },
}
