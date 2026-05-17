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
        cyan:     '#22d3ee',
        cyanDk:   '#06b6d4',
        cyanLt:   '#67e8f9',
        warm:     '#fbbf24',
        textPri:  'var(--c-text-pri)',
        textSec:  'var(--c-text-sec)',
        textMut:  'var(--c-text-mut)',
      },
      fontFamily: {
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        sans:    ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
