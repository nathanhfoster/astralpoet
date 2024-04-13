import isString from './isString'

export const DATE_FORMAT =
	/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/

const getValidIsoString = (date: Date) => {
	try {
		return date.toISOString()
	} catch (error) {
		console.error(error)
	}

	return date
}

const getValidDate = (s: any, getIsoString = false) => {
	if (s instanceof Date) {
		return getIsoString ? getValidIsoString(s) : s.toLocaleDateString('en-CA')
	}

	if (isString(s) && DATE_FORMAT.test(s)) {
		const date = new Date(s)

		console.log({ date })

		return getIsoString
			? getValidIsoString(date)
			: date.toLocaleDateString('en-CA')
	}

	return s
}

export default getValidDate
