import React, { FC } from 'react'
import {
	Calendar as RewindCalendar,
	CalendarProps as RewindCalendarProps,
} from '@rewind-ui/core'
import { EntriesStateContext } from '@/contexts/EntriesContext'
import { EntriesContextState } from '@/contexts/EntriesContext/types'
import { connect } from '@/packages/ui'

export interface CalendarProps extends RewindCalendarProps {}

export interface CalenderMapStateToProps
	extends Pick<EntriesContextState, 'entries'> {}

export interface CalendarConnectedProps
	extends CalendarProps,
		CalenderMapStateToProps {}

const Calendar: FC<CalendarConnectedProps> = ({
	onChange,
	entries: _entries,
}) => {
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

export default connect<CalenderMapStateToProps>({
	mapStateToPropsOptions: [
		{
			context: EntriesStateContext,
			mapStateToProps: (entriesState: EntriesContextState) => ({
				entries: entriesState.entries,
			}),
		},
	],
})(Calendar)
