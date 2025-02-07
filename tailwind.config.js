/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // Asegúrate de que Tailwind escanea los archivos Angular
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("tailwindcss-primeui"), // Carga el plugin correctamente
  ],
};
