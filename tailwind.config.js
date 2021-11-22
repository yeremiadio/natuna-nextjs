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
      boxShadow: {
        "default-natuna": "rgb(0 0 0 / 2%) 0px 3.5px 5.5px",
        "boxShadow-siderbar-main": "rgb(0 0 0 / 15%) -16px 4px 40px",
      },
      backgroundImage: {
        "hero-pattern": "url('/img/hero-pattern.svg')",
        dropzone:
          "url('data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='6' ry='6' stroke='rgba(0,0,0,0.2)' stroke-width='5' stroke-dasharray='6%2c 24' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e')",

        "waves-one":
          "url('data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%230099ff' fill-opacity='1' d='M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E')",
      },
      backgroundBlendMode: {},
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
