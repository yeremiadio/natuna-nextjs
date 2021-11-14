module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter"],
      },
      colors: {
        whiteboard: "#F8F9FA",
      },
      backgroundImage: {
        "hero-pattern": "url('/img/hero-pattern.svg')",
        dropzone:
          "url('data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='6' ry='6' stroke='rgba(0,0,0,0.2)' stroke-width='5' stroke-dasharray='6%2c 24' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e')",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
