import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  corePlugins: {
    preflight: false,
  },
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'muted-foreground': 'hsl(240 3.8% 46.1%)',
      },
    },
  },
  plugins: [],
} satisfies Config
