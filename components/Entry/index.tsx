import { FC } from 'react'
import FormControl from '@rewind-ui/core/dist/components/FormControl/FormControl'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import {
	EntriesActions,
	EntriesDispatchContext,
} from '@/contexts/EntriesContext'
import { saveEntryToDb } from '@/contexts/EntriesContext/indexedDb'
import {
	connect,
	useDebouncedCallback,
	useEffectAfterMount,
} from '@/packages/ui'
import { IconCalendar, IconHeading } from '@/packages/ui/src/icons'
import { getValidDate } from '@/packages/utils/src'
import Ellipsis from './components/Ellipsis'
import {
	EntryConnectedProps,
	EntryMapDispatchToProps,
	EntryMapStateToProps,
	EntryOwnProps,
} from './types'

const Editor = dynamic(() => import('@/components/Editor'), { ssr: false })

const Entry: FC<EntryConnectedProps> = ({ setEntryValue, entry }) => {
	const router = useRouter()
	const debounceSaveEntryToDb = useDebouncedCallback(saveEntryToDb, [], 1000)

	useEffectAfterMount(() => {
		if (entry?.id) {
			debounceSaveEntryToDb(entry)
		}
	}, [entry?.title, entry?.date_created, entry?.html])

	if (!entry) {
		router.push('/')

		return null
	}
	const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEntryValue({
			id: entry?.id,
			key: 'date_created',
			value: event.target.value,
		})
	}

	const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEntryValue({
			id: entry.id,
			key: 'title',
			value: event.target.value,
		})
	}

	const handleEditorStateChange = (value: string) => {
		setEntryValue({ id: entry.id, key: 'html', value })
	}

	return (
		<FormControl size='lg' className='text-white'>
			<FormControl.InputGroup size='lg' tone='transparent'>
				<FormControl.Input
					className='cursor-default text-inherit'
					type='date'
					value={getValidDate(entry.date_created)}
					leftIcon={<IconCalendar />}
					tone='transparent'
					onChange={handleDateChange}
				/>
				<Ellipsis entryId={entry.id} />
			</FormControl.InputGroup>
			<FormControl.InputGroup size='lg' tone='transparent'>
				<FormControl.Input
					className='text-inherit'
					placeholder='My first diary entry'
					leftIcon={<IconHeading />}
					value={entry.title}
					onChange={handleTitleChange}
				/>
			</FormControl.InputGroup>
			<Editor
				className='h-dvh resize-none'
				onChange={handleEditorStateChange}
				value={entry.html}
			/>
		</FormControl>
	)
}

export default connect<
	EntryMapStateToProps,
	EntryMapDispatchToProps,
	EntryOwnProps
>({
	mapDispatchToPropsOptions: [
		{
			context: EntriesDispatchContext,
			mapDispatchToProps: {
				setEntryValue: EntriesActions.setEntryValue,
			},
		},
	],
})(Entry)
