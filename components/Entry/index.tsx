import { FC } from 'react'
import FormControl from '@rewind-ui/core/dist/components/FormControl/FormControl'
import InputGroup from '@rewind-ui/core/dist/components/InputGroup/InputGroup'
import dynamic from 'next/dynamic'
import {
	EntriesActions,
	EntriesDispatchContext,
	EntriesStateContext,
} from '@/contexts/EntriesContext'
import { EntriesContextState, Entry } from '@/contexts/EntriesContext/types'
import { connect } from '@/packages/ui'
import {
	IconCalendar,
	IconEllipsis,
	IconHeading,
} from '@/packages/ui/src/icons'
import {
	EntryConnectedProps,
	EntryMapDispatchToProps,
	EntryMapStateToProps,
	EntryOwnProps,
} from './types'

const Editor = dynamic(() => import('@/components/Editor'), { ssr: false })

const Entry: FC<EntryConnectedProps> = ({
	id,
	setEntryValue,
	title,
	date_updated,
	html,
}) => {
	const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEntryValue({ id, key: 'date_created', value: event.target.value })
	}

	const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEntryValue({ id, key: 'title', value: event.target.value })
	}

	const handleEditorStateChange = (value: string) => {
		setEntryValue({ id, key: 'html', value })
	}

	return (
		<FormControl size='lg' className='text-white'>
			<FormControl.InputGroup size='lg' tone='transparent'>
				<FormControl.Input
					className='cursor-default text-inherit'
					type='date'
					placeholder='My first diary entry'
					value={new Date(date_updated).toLocaleDateString('en-CA')}
					leftIcon={<IconCalendar />}
					tone='transparent'
					onChange={handleDateChange}
				/>
				<InputGroup.Button tone='solid'>
					<IconEllipsis />
				</InputGroup.Button>
			</FormControl.InputGroup>
			<FormControl.InputGroup size='lg' tone='transparent'>
				<FormControl.Input
					className='text-inherit'
					placeholder='My first diary entry'
					leftIcon={<IconHeading />}
					value={title}
					onChange={handleTitleChange}
				/>
			</FormControl.InputGroup>
			<Editor
				className='h-dvh resize-none'
				onChange={handleEditorStateChange}
				value={html}
			/>
		</FormControl>
	)
}

export default connect<
	EntryMapStateToProps,
	EntryMapDispatchToProps,
	EntryOwnProps
>({
	mapStateToPropsOptions: [
		{
			context: EntriesStateContext,
			mapStateToProps: (entriesState: EntriesContextState, ownProps) => {
				const entry = entriesState.entries.find(
					(entry) => entry.id == ownProps.entryId,
				) as Entry

				return entry
			},
		},
	],
	mapDispatchToPropsOptions: [
		{
			context: EntriesDispatchContext,
			mapDispatchToProps: {
				setEntryValue: EntriesActions.setEntryValue,
			},
		},
	],
})(Entry)
