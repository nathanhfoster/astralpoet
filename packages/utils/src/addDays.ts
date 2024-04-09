import { addDays } from 'date-fns'

const addDaysFn = (
	dateValue: string | number | Date,
	increment: number,
): Date => {
	return addDays(new Date(dateValue), increment)
}

export default addDaysFn
