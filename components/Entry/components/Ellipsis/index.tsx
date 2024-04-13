import { FC } from 'react'
import Dropdown from '@rewind-ui/core/dist/components/Dropdown/Dropdown'
import InputGroup from '@rewind-ui/core/dist/components/InputGroup/InputGroup'
import { useRouter } from 'next/router'
import {
	EntriesActions,
	EntriesDispatchContext,
} from '@/contexts/EntriesContext'
import { deleteEntryFromDb } from '@/contexts/EntriesContext/indexedDb'
import { connect } from '@/packages/ui'
import { IconEllipsis } from '@/packages/ui/src/icons'
import {
	EllipsisConnectedProps,
	EllipsisMapDispatchToProps,
	EllipsisMapStateToProps,
	EllipsisOwnProps,
} from './types'

const Ellipsis: FC<EllipsisConnectedProps> = ({ deleteEntry, entryId }) => {
	const router = useRouter()

	const handleDeleteEntry = () => {
		deleteEntryFromDb(entryId).then(() => {
			deleteEntry(entryId)
			router.back()
		})
	}

	return (
		<Dropdown tone='solid'>
			<Dropdown.Trigger>
				<InputGroup.Button tone='solid'>
					<IconEllipsis />
				</InputGroup.Button>
			</Dropdown.Trigger>
			<Dropdown.Content>
				<Dropdown.Label>Entry</Dropdown.Label>
				<Dropdown.Divider />
				<Dropdown.Item>Settings</Dropdown.Item>
				<Dropdown.Label>Danger Zone</Dropdown.Label>
				<Dropdown.Divider />
				<Dropdown.Item onClick={handleDeleteEntry}>Delete</Dropdown.Item>
			</Dropdown.Content>
		</Dropdown>
	)
}

export default connect<
	EllipsisMapStateToProps,
	EllipsisMapDispatchToProps,
	EllipsisOwnProps
>({
	mapDispatchToPropsOptions: [
		{
			context: EntriesDispatchContext,
			mapDispatchToProps: {
				deleteEntry: EntriesActions.deleteEntry,
			},
		},
	],
})(Ellipsis)
