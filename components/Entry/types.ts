import { EntriesActions } from '@/contexts/EntriesContext'
import { Entry } from '@/contexts/EntriesContext/types'

export interface EntryMapStateToProps {}

export interface EntryMapDispatchToProps {
	setEntryValue: typeof EntriesActions.setEntryValue
}
export interface EntryOwnProps {
	entry?: Entry
}

export interface EntryConnectedProps
	extends EntryOwnProps,
		EntryMapStateToProps,
		EntryMapDispatchToProps {}
