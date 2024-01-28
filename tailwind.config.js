/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'class',
	theme: {
		fontFamily: {
			nunito: ['nunito-sans', 'sans-serif'],
		},
		colors: {
			dblue: {
				100: '#2b3945',
				200: '#202c37',
				300: '#111517',
			},
			dgray: {
				100: '#fafafa',
				200: '#858585',
			},
			white: '#ffffff',
		},
		borderRadius: {
			s: '5px',
		},
		boxShadow: {
			s: '0px 2px 4px 0px rgba(0, 0, 0, 0.06)',
			m: '0px 2px 9px 0px rgba(0, 0, 0, 0.05)',
			card: '0px 0px 7px 2px rgba(0, 0, 0, 0.03)',
			btn: '0px 0px 7px 0px rgba(0, 0, 0, 0.29)',
		},
		extend: {
			flex: {
				card: '0 1 16.5rem',
			},
			padding: {
				mobile: 'clamp(1rem, 4%, 5rem)',
				desktop: 'clamp(1rem, 6%, 5rem)',
			},
		},
	},
	plugins: [],
};
