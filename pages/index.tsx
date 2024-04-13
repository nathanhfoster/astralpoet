import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import { navigateFromServer } from '@/packages/utils/src'

interface IndexProps {}

const Index: NextPage<IndexProps> = () => {
	return null
}

export const getServerSideProps: GetServerSideProps = async (
	context: GetServerSidePropsContext,
) => {
	const props: IndexProps = {}

	navigateFromServer(context, '/entries/calendar')

	return {
		props,
	}
}

export default Index
