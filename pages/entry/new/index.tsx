import type {
	GetServerSideProps,
	GetServerSidePropsContext,
	NextPage,
} from 'next'
import dynamic from 'next/dynamic'
import {
	EntriesActions,
	EntriesDispatchContext,
} from '@/contexts/EntriesContext'
import { connect, useEffectOnce } from '@/packages/ui'

const Entry = dynamic(() => import('@/components/Entry'), { ssr: false })

interface NewEntryProps {
	date_created: string
}

interface NewEntryMapDispatchToProps {
	setNewEntry: typeof EntriesActions.setNewEntry
}

interface NewEntryConnectedProps
	extends NewEntryProps,
		NewEntryMapDispatchToProps {}

const NewEntry: NextPage<NewEntryConnectedProps> = ({
	date_created,
	setNewEntry,
}) => {
	useEffectOnce(() => {
		setNewEntry({ date_created })
	})

	return <Entry entryId='new' />
}

export const getServerSideProps: GetServerSideProps = async (
	context: GetServerSidePropsContext,
) => {
	const { date } = context.query
	const props: NewEntryProps = {
		date_created: (date as string) ?? new Date().toLocaleDateString('en-CA'),
	}

	return {
		props,
	}
}

export default connect<{}, NewEntryMapDispatchToProps>({
	mapDispatchToPropsOptions: [
		{
			context: EntriesDispatchContext,
			mapDispatchToProps: {
				setNewEntry: EntriesActions.setNewEntry,
			},
		},
	],
})(NewEntry)
