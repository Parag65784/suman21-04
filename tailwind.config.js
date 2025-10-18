/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1D4ED8',
          light: '#3B82F6',
          dark: '#1E40AF',
        },
        success: {
          DEFAULT: '#059669',
          light: '#34D399',
          dark: '#065F46',
        },
        danger: {
          DEFAULT: '#DC2626',
          light: '#F87171',
          dark: '#991B1B',
        },
        neutral: {
          white: '#F9FAFB',
          silver: '#9CA3AF',
          gray: '#4B5563',
          black: '#111827',
        },
        bg: {
          dark: '#061e59',
          light: '#f0f2f5',
          card: {
            dark: '#1A2C4E',
            light: '#ffffff'
          },
          nav: {
            dark: '#19398a',
            light: '#ffffff'
          }
        }
      }
    }
  },
  plugins: []
};