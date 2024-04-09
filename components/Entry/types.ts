import { EntriesActions } from '@/contexts/EntriesContext'
import { Entry } from '@/contexts/EntriesContext/types'

export interface EntryMapStateToProps extends Entry {}

export interface EntryMapDispatchToProps {
	setEntryValue: typeof EntriesActions.setEntryValue
}
export interface EntryOwnProps {
	entryId: Entry['id'] | string
}

export interface EntryConnectedProps
	extends EntryOwnProps,
		EntryMapStateToProps,
		EntryMapDispatchToProps {}
