import { GetServerSidePropsContext, NextPage } from 'next'
import dynamic from 'next/dynamic'
import { EntriesStateContext } from '@/contexts/EntriesContext'
import {
	EntriesContextState,
	Entry as EntryType,
} from '@/contexts/EntriesContext/types'
import connect from '@/packages/ui/src/contexts/ContextStore/connect'

const Entry = dynamic(() => import('@/components/Entry'), { ssr: false })

interface ViewEntryPageProps {
	entryId: EntryType['id']
}

interface ViewEntryPageMapStateToProps {
	entry: EntryType
}

interface ViewEntryPageMapDispatchToProps {}

interface ViewEntryPageConnectedProps
	extends ViewEntryPageMapStateToProps,
		ViewEntryPageMapDispatchToProps,
		ViewEntryPageProps {}

const ViewEntryPage: NextPage<ViewEntryPageConnectedProps> = ({ entry }) => {
	return <Entry entry={entry} />
}

export const getServerSideProps = async (
	context: GetServerSidePropsContext,
) => {
	const entryId = parseInt((context.params?.id as string) ?? '')

	return {
		props: {
			entryId,
		},
	}
}

export default connect<
	ViewEntryPageMapStateToProps,
	ViewEntryPageMapDispatchToProps,
	ViewEntryPageProps
>({
	mapStateToPropsOptions: [
		{
			context: EntriesStateContext,
			mapStateToProps: (entriesState: EntriesContextState, ownProps) => {
				const entry = entriesState.entries.find(
					(entry) => entry?.id === ownProps?.entryId,
				) as EntryType

				return { entry }
			},
		},
	],
})(ViewEntryPage)
