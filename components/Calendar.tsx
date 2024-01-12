import React, { FC } from 'react'
import { Calendar as RewindCalendar } from '@rewind-ui/core'

interface CalendarProps {}
const Calendar: FC<CalendarProps> = () => {
	return (
		<RewindCalendar
			bordered={false}
			disabledDates={[]}
			greenDates={[new Date()]}
			disabledWeekends={false}
			horizontalBorders={false}
			minDate={undefined}
			maxDate={undefined}
			radius='lg'
			shadow='xl'
			size='xl'
			verticalBorders={false}
		></RewindCalendar>
	)
}

export default Calendar
