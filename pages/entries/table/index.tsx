import { Table } from '@rewind-ui/core'
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import { useRouter } from 'next/router'
import { EntriesActions, EntriesStateContext } from '@/contexts/EntriesContext'
import {
	EntriesContextState,
	ENTRY_KEYS,
} from '@/contexts/EntriesContext/types'
import connect from '@/packages/ui/src/contexts/ContextStore/connect'

interface TableMapStateToProps extends Pick<EntriesContextState, 'entries'> {}

interface TableMapDispatchToProps {
	setEntry: typeof EntriesActions.setEntry
}

interface TableProps {}

interface TableConnectedProps
	extends TableMapStateToProps,
		TableMapDispatchToProps,
		TableProps {}

const TablePage: NextPage<TableConnectedProps> = ({ entries }) => {
	const router = useRouter()

	return (
		<Table headerColor='dark' outerBorders={false} radius='none' size='lg'>
			<Table.Thead>
				<Table.Tr>
					{ENTRY_KEYS.map((key) => (
						<Table.Th key={`header-${key}`} align='left'>
							{key}
						</Table.Th>
					))}
				</Table.Tr>
			</Table.Thead>
			<Table.Tbody>
				{entries.map((entry) => (
					<Table.Tr
						key={entry.id}
						onClick={() => {
							router.push(`/entry/${entry.id}`)
						}}
					>
						{ENTRY_KEYS.map((key) => (
							<Table.Th key={key} align='left'>
								{String(entry[key as keyof typeof entry])}
							</Table.Th>
						))}
					</Table.Tr>
				))}
			</Table.Tbody>
			<Table.Tfoot>
				<Table.Tr>
					{ENTRY_KEYS.map((key) => (
						<Table.Th key={`footer-${key}`} align='left'>
							{key}
						</Table.Th>
					))}
				</Table.Tr>
			</Table.Tfoot>
		</Table>
	)
}

export const getServerSideProps: GetServerSideProps = async (
	_context: GetServerSidePropsContext,
) => {
	const props: TableProps = {}

	return {
		props,
	}
}

export default connect<
	TableMapStateToProps,
	TableMapDispatchToProps,
	TableProps
>({
	mapStateToPropsOptions: [
		{
			context: EntriesStateContext,
			mapStateToProps: (entriesState: EntriesContextState) => {
				return {
					entries: entriesState.entries,
				}
			},
		},
	],
})(TablePage)
