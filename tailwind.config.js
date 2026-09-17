/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          // Blue accent per the refactor spec (#2563EB === tailwind blue-600).
          blue: '#2563EB',
          navy: '#0F172A',
          orange: '#F97316',
          pink: '#E11D48',
          purple: '#7C3AED',
          emerald: '#10B981',
          cyan: '#06B6D4',
        },
      },
      boxShadow: {
        xs: '0 1px 2px 0 rgb(0 0 0 / 0.04)',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};
