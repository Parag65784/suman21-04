/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
      },
      boxShadow: {
        'card': '0 8px 30px rgba(0, 0, 0, 0.12)',
      },
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
          light: '#112240',
          card: '#1A2C4E',
          nav: '#19398a'
        }
      }
    }
  },
  plugins: []
};