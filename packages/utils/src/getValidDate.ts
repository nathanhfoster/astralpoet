import isString from './isString'

export const dateFormat =
	/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/

const getValidDate = (s: string, getIsoString = false) => {
	if (isString(s) && dateFormat.test(s)) {
		const date = new Date(s)

		return getIsoString ? `${date.toISOString()}` : date
	}

	return s
}

export default getValidDate
