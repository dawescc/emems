// tailwind.config.cjs
module.exports = {
    content: [
      "./src/*/*.{html,js,ts,jsx,tsx}",
      "./src/**/*.{html,js,ts,jsx,tsx}"
    ],
    theme: {
      extend: {},
    },
    plugins: [
      require('@tailwindcss/aspect-ratio'),
    ],
  }