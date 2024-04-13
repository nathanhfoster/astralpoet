import { EntriesActions } from '@/contexts/EntriesContext'
import { Entry } from '@/contexts/EntriesContext/types'

export interface EllipsisMapStateToProps {}

export interface EllipsisMapDispatchToProps {
	deleteEntry: typeof EntriesActions.deleteEntry
}

export interface EllipsisOwnProps {
	entryId: Entry['id']
}

export interface EllipsisConnectedProps
	extends EllipsisMapStateToProps,
		EllipsisMapDispatchToProps,
		EllipsisOwnProps {}
