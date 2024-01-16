import React, { FC } from 'react'
import {
	Calendar as RewindCalendar,
	CalendarProps as RewindCalendarProps,
} from '@rewind-ui/core'

export interface CalendarProps extends RewindCalendarProps {}

const Calendar: FC<CalendarProps> = ({ onChange }) => {
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
			onChange={onChange}
		></RewindCalendar>
	)
}

export default Calendar
