import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'page-bg': '#FAF7F2',
        'card-bg': '#F0EBE3',
        'card-border': '#E8E0D5',
        'text-primary': '#1A1A1A',
        'text-muted': '#6B6560',
        'accent': '#C8956C',
        'accent-hover': '#B8845C',
      },
      fontFamily: {
        playfair: ['var(--font-playfair)', 'serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
