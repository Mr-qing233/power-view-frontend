import type { Config } from 'tailwindcss';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      spacing: {
        30: '7.5rem',
        35: '8.75rem',
        43: '10.75rem',
        50: '12.5rem',
        54: '13.5rem',
        67: '16.75rem',
        108: '27rem',
        112: '28rem',
        120: '30rem',
        128: '32rem',
        140: '35rem',
      },
      width: {
        '10vw': '10vw',
        '20vw': '20vw',
        '30vw': '30vw',
        '40vw': '40vw',
        '50vw': '50vw',
        '60vw': '60vw',
        '70vw': '70vw',
        '80vw': '80vw',
        '85vw': '85vw',
        '90vw': '90vw',
        '100vw': '100vw',
      },
      height: {
        '10vh': '10vh',
        '20vh': '20vh',
        '30vh': '30vh',
        '40vh': '40vh',
        '50vh': '50vh',
        '60vh': '60vh',
        '70vh': '70vh',
        '80vh': '80vh',
        '90vh': '90vh',
        '100vh': '100vh',
      },
      gridTemplateColumns: {
        16: 'repeat(16, minmax(0, 1fr))',
        18: 'repeat(18, minmax(0, 1fr))',
        20: 'repeat(20, minmax(0, 1fr))',
        24: 'repeat(24, minmax(0, 1fr))',
      },
      gridColumn: {
        'span-16': 'span 16 / span 16',
        'span-18': 'span 18 / span 18',
        'span-20': 'span 20 / span 20',
        'span-24': 'span 24 / span 24',
      },
      screens: {
        '3xl': '2160px',
      },
      lineHeight: {
        '0px': '0px',
      },
      zIndex: {
        1080: '1080',
      },
      scale: {
        200: '2.00',
        300: '3.00',
        400: '4.00',
      },
    },
  },
  plugins: [],
} satisfies Config;
