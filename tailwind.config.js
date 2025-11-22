/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0e7ff',
          100: '#e0cfff',
          200: '#c9a5ff',
          300: '#b07aff',
          400: '#9d5aff',
          500: '#8b3aff',
          600: '#7c2aff',
          700: '#6b1aff',
          800: '#5a0aff',
          900: '#4a00ff',
        },
        neon: {
          pink: '#ff00ff',
          blue: '#00ffff',
          purple: '#8b5cf6',
        },
      },
      animation: {
        'gradient': 'gradient 15s ease infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}

