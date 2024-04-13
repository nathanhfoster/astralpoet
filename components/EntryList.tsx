import React, { FC } from 'react'
import { useRouter } from 'next/router'
import { EntriesStateContext } from '@/contexts/EntriesContext'
import { EntriesContextState } from '@/contexts/EntriesContext/types'
import { connect } from '@/packages/ui'

export interface EntryListProps {}

export interface CalenderMapStateToProps
	extends Pick<EntriesContextState, 'entries'> {}

export interface EntryListConnectedProps
	extends EntryListProps,
		CalenderMapStateToProps {}

const EntryList: FC<EntryListConnectedProps> = ({ entries }) => {
	const router = useRouter()

	return (
		<ul
			className='w-full h-full text-sm font-medium text-gray-900 bg-white border border-gray-200 overflow-auto'
			style={{ height: 'calc(100vh - 164px)' }}
		>
			{entries.map((entry) => (
				<li
					key={entry.id}
					className='w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-200 hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-100'
					onClick={() => {
						router.push(`/entry/${entry.id}`)
					}}
				>
					{entry.title}
				</li>
			))}
		</ul>
	)
}

export default connect({
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
})(EntryList)
