/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        '4xl': '2.8rem',
        'lg': '1.3rem',
        '2px': '2px',
      },
      spacing: {
        '50vmin': '50vmin',
        '40vmin': '40vmin'
      },
      colors: {
        'left_time': "var(--left_time)",
        'past_time': "var(--past_time",
      },
      screens: {
        'small': '399px',
        'medium': '499px'
      },
    }
  },
  plugins: [],
  darkMode: 'class'
}

