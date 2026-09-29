/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        metaforge: {
          bg: '#090d16',
          card: '#0f172a',
          border: '#1e293b',
          accent: '#38bdf8',
          accentGlow: 'rgba(56, 189, 248, 0.15)',
          success: '#10b981',
          warning: '#f59e0b',
          danger: '#ef4444',
          muted: '#64748b',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'JetBrains Mono', 'Menlo', 'monospace'],
      }
    },
  },
  plugins: [],
}
