/** @type {import('tailwindcss').Config} */
module.exports = {
  // corePlugins: {
  //   preflight: false
  // },
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        banner: "url(/img/banner-bg.webp)",
        contactButton: "url(/img/tire-btn-pattern.webp)",
        cta: "url(/img/call-to-action-bg.webp)",
        footer: "url(/img/footer-bg.webp)",
      },
      colors: {
        primary: "#bc8047",
        secondary: "#83879d",
        hover:"#263045"
      },
      gridTemplateColumns: {
        review: "200px 1fr",
        blog: "230px 1fr",
        process: "50px 1fr",
        howTo: "60px 1fr",
        footer: "1fr 1fr 0.4fr 0.5fr",
      },
    },
    fontFamily: {
      exo2: ['Exo2', 'sans-serif'],
      'exo2-light': ['Exo2-Light', 'sans-serif'],
      'exo2-bold': ['Exo2-Bold', 'sans-serif'],
      'exo2-black': ['Exo2-Black', 'sans-serif'],
    },
  },
  plugins: [require("flowbite/plugin")],
};
