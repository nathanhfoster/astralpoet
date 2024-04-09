import { format } from 'date-fns'

const formatDate = (dateValue: string): string => {
	const utcDate = new Date(dateValue)
	const offsetDate = new Date(
		utcDate.getTime() - utcDate.getTimezoneOffset() * -60000,
	)

	return format(offsetDate, "y-MM-dd'T'HH:mm:ssXXX")
}

export default formatDate
