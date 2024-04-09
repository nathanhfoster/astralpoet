import getValidDate from './getValidDate'

const jsonParseDates = (_key: string, value: string) =>
	getValidDate(value, true)

export default jsonParseDates
