import { FormControl, InputGroup } from '@rewind-ui/core'
import type {
	GetServerSideProps,
	GetServerSidePropsContext,
	NextPage,
} from 'next'
import { IconCalendar, IconEllipsis, IconHeading } from '@/packages/ui'

interface NewEntryProps {
	date: string
}

const NewEntry: NextPage<NewEntryProps> = ({ date }) => {
	return (
		<FormControl size='lg'>
			<FormControl.InputGroup size='lg' tone='solid'>
				<FormControl.Input
					className='cursor-default'
					type='date'
					placeholder='My first diary entry'
					disabled
					value={date}
					leftIcon={<IconCalendar />}
				/>
				<InputGroup.Button color='gray'>
					<IconEllipsis />
				</InputGroup.Button>
			</FormControl.InputGroup>
			<FormControl.InputGroup size='lg' tone='solid'>
				<FormControl.Input
					placeholder='My first diary entry'
					leftIcon={<IconHeading />}
				/>
			</FormControl.InputGroup>
			<FormControl.Textarea
				className='h-dvh resize-none'
				rows={8}
				cols={50}
				disabled={false}
				shadow='sm'
				radius='lg'
				size='lg'
				tone='solid'
				validation='none'
				withRing={false}
				defaultValue="After I've installed Astral Poet today, I will make a diary entry every day from now on. In case I forget to make an entry, the app will remind me with a notification in the evening. In addition to photos, videos, audio recordings or other files, I can also add a location, tags or people to my diary entries.✍ I can use it on all my devices and synchronize the journal with the sync button on the main page. I am already looking forward to revisiting all those memories in a few months or years. ✨"
				placeholder=''
			/>
		</FormControl>
	)
}

export const getServerSideProps: GetServerSideProps = async (
	context: GetServerSidePropsContext,
) => {
	const { date } = context.query
	const props: NewEntryProps = {
		date: (date as string) ?? new Date().toLocaleDateString('en-CA'),
	}

	return {
		props,
	}
}

export default NewEntry
