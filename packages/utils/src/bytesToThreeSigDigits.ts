function bytesToThreeSigDigits(size: number) {
	const units = ['bytes', 'KB', 'MB', 'GB', 'TB']
	let scaleIndex = 0
	let scaledValue = size

	while (scaledValue > 1000 && scaleIndex < units.length - 1) {
		scaledValue = scaledValue / 1024
		scaleIndex += 1
	}

	const roundedSizeValue = scaledValue.toFixed(2)

	return `${roundedSizeValue}${units[scaleIndex]}`
}

export default bytesToThreeSigDigits
