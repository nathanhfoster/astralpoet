import { subDays } from 'date-fns'

const subDaysFn = (
	dateValue: string | number | Date,
	decrement: number,
): Date => {
	return subDays(new Date(dateValue), decrement)
}

export default subDaysFn
