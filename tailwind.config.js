/* eslint-disable @typescript-eslint/no-var-requires */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
		// you can either add all styles
		'./node_modules/@rewind-ui/core/dist/theme/styles/*.js',
		// OR you can add only the styles you need
		'./node_modules/@rewind-ui/core/dist/theme/styles/Button.styles.js',
		'./node_modules/@rewind-ui/core/dist/theme/styles/Text.styles.js',
	],
	darkMode: 'media',
	plugins: [
		require('tailwindcss-safe-area'),
		require('@tailwindcss/typography'),
		require('tailwind-scrollbar')({ nocompatible: true }),
		require('@tailwindcss/forms')({
			strategy: 'class' /* only generate classes */,
		}),
	],
}
