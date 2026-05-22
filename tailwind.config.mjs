/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg:       'var(--c-bg)',
        surface:  'var(--c-surface)',
        border:   'var(--c-border)',
        green:    '#2D5016',
        greenDk:  '#1A3A0D',
        greenLt:  '#6B8F5E',
        amber:    '#D97706',
        textPri:  'var(--c-text-pri)',
        textSec:  'var(--c-text-sec)',
        textMut:  'var(--c-text-mut)',
      },
      fontFamily: {
        display: ['Fraunces', 'system-ui', 'sans-serif'],
        sans:    ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
