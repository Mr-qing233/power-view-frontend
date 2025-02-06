/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['selector', '[data-mode="dark"]', 'class'],
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/sectors/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	extend: {
  		colors: {
  			'layout-header': '#f1f1f1',
  			'layout-sider': '#ffffff',
  			'text-primary': 'rgba(0, 0, 0, 0.88)',
  			'text-secondary': 'rgba(0, 0, 0, 0.45)',
  			'dark-layout-header': '#1f1f1f',
  			'dark-layout-sider': '#141414',
  			'dark-text-primary': 'rgba(255, 255, 255, 0.85)',
  			'dark-text-secondary': 'rgba(255, 255, 255, 0.45)',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		spacing: {
  			'30': '7.5rem',
  			'35': '8.75rem',
  			'43': '10.75rem',
  			'50': '12.5rem',
  			'54': '13.5rem',
  			'67': '16.75rem',
  			'108': '27rem',
  			'112': '28rem',
  			'120': '30rem',
  			'128': '32rem',
  			'140': '35rem'
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
  			'100vw': '100vw'
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
  			'100vh': '100vh'
  		},
  		gridTemplateColumns: {
  			'16': 'repeat(16, minmax(0, 1fr))',
  			'18': 'repeat(18, minmax(0, 1fr))',
  			'20': 'repeat(20, minmax(0, 1fr))',
  			'24': 'repeat(24, minmax(0, 1fr))'
  		},
  		gridColumn: {
  			'span-16': 'span 16 / span 16',
  			'span-18': 'span 18 / span 18',
  			'span-20': 'span 20 / span 20',
  			'span-24': 'span 24 / span 24'
  		},
  		screens: {
  			'3xl': '2160px'
  		},
  		lineHeight: {
  			'0px': '0px'
  		},
  		zIndex: {
  			'1080': '1080'
  		},
  		scale: {
  			'200': '2.00',
  			'300': '3.00',
  			'400': '4.00'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}
