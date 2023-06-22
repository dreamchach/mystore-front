/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily : {
        press : ["'Diphylleia'", "serif"],
        normal : ["'Nanum Gothic'", 'sans-serif']
      },
      colors : {
        main : '#FF8066',
        main_white : '#FFF7F3',
        main_black : '#3A2726'
      }
    },
  },
  plugins: [],
}
