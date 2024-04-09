export default function copyToClipboard(text: string): void {
	navigator.clipboard
		.writeText(text)
		.then(() => {
			console.log('Text copied to clipboard')
		})
		.catch((error) => {
			console.error('Failed to copy text to clipboard:', error)
		})
}
