// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const formatPercent = (inputValue: string, showPercentageSign = false) => {
	const nextValue = inputValue
		.replace(',', '.')
		.replace(/[^0-9.]/g, '')
		.trimLeft()
	const stringValue = nextValue.substring(0, 5)
	const percentageDecorator = showPercentageSign ? '%' : ''
	const percentValue = Number(parseFloat(stringValue))

	if (nextValue.length <= 0) {
		return ''
	}
	if (percentValue < 10 && nextValue.length > 4) {
		return `${stringValue.substring(0, 4)}${percentageDecorator}`
	}
	if (percentValue >= 100) {
		return `${stringValue.slice(0, 2)}.${stringValue.slice(
			2,
		)}${percentageDecorator}`
	}

	return `${stringValue}${percentageDecorator}`
}

export default formatPercent
