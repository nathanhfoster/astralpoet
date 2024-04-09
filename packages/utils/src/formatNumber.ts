import isNil from './isNil'

interface NumberFormatCustomOptions {
	process?: (val: number) => number
}

const formatNumber = (
	val?: number | string | null,
	options?: Intl.NumberFormatOptions & NumberFormatCustomOptions,
): string => {
	const { process, ...intlOptions } = options || {}

	if (isNil(val)) return ''
	if (process) process(Number(val))
	const numberVal = Number(val)

	return new Intl.NumberFormat('en-us', {
		currency: 'USD',
		...intlOptions,
	}).format(process ? process(numberVal) : numberVal)
}

export default formatNumber
