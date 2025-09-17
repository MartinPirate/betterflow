/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          primary: '#9152DE',
          dark: '#5F29A1',
        },
        blue: {
          accent: '#204782',
        },
        gray: {
          dark: '#2C3E50',
          medium: '#7F8C8D',
          light: '#ECF0F1',
        },
        white: {
          soft: '#FAFAFA',
        },
        status: {
          success: '#10B981',
          danger: '#EF4444',
          warning: '#F59E0B',
          info: '#3B82F6',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        'card': '8px',
        'button': '4px',
      },
    },
  },
  plugins: [],
}