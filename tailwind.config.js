/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        surface: '#ffffff',
        canvas: '#f8fafc',
        ink: '#172033',
        muted: '#64748b',
        line: '#e2e8f0',
        income: '#16a34a',
        expense: '#dc2626',
        accent: '#7c3aed',
        warning: '#f59e0b',
      },
      borderRadius: {
        card: '16px',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

