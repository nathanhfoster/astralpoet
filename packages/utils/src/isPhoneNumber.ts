/* eslint-disable no-useless-escape */
const isPhoneNumber = (string: string) => {
	if (!string) return false

	if (string.length < 6 || string.length > 13) {
		return false
	}

	return string.match(/^(\+\d*|\d*)$/g)
}

export default isPhoneNumber
