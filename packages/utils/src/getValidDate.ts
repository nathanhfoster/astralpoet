import isString from './isString'

export const dateFormat =
	/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/

const getValidDate = (s: any) => {
	if (isString(s) && dateFormat.test(s)) {
		const date = new Date(s)

		return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
	}

	return s
}

export default getValidDate
