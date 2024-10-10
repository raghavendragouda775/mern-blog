/** @type {import('tailwindcss').Config} */
import flowbitePlugin from 'flowbite/plugin'; // Import Flowbite plugin

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}', // Include Flowbite content manually
  ],
  theme: {
    extend: {},
  },
  plugins: [
    flowbitePlugin, 
    require('tailwind-scrollbar'),
  ],
}
