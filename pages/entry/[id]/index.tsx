import { GetServerSidePropsContext, NextPage } from 'next'
import dynamic from 'next/dynamic'
import { Entry } from '@/contexts/EntriesContext/types'

const Entry = dynamic(() => import('@/components/Entry'), { ssr: false })

interface ViewEntryPageProps {
	entryId: string
}

interface ViewEntryPageMapStateToProps {
	entry: Entry
}

interface ViewEntryPageConnectedProps
	extends ViewEntryPageProps,
		ViewEntryPageMapStateToProps {}

const ViewEntryPage: NextPage<ViewEntryPageConnectedProps> = ({ entryId }) => {
	return <Entry entryId={entryId} />
}

export const getServerSideProps = async (
	context: GetServerSidePropsContext,
) => {
	const entryId = context.params?.id as string

	return {
		props: {
			entryId,
		},
	}
}

export default ViewEntryPage
