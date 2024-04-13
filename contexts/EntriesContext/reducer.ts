import { ChangeEvent } from 'react'
import { ContextStoreInitializer } from '@/packages/ui/src/contexts/ContextStore/types'
import createReducer from '@/packages/ui/src/contexts/ContextStore/utils/createReducer'
import exportFile from '@/packages/utils/src/exportFile'
import loadJSON from '@/packages/utils/src/loadJSON'
import { getEntriesDb, saveEntriesToDb } from './indexedDb'
import {
	EntriesContextProviderProps,
	EntriesContextState,
	Entry,
} from './types'
import { formattedEntries } from './utils'

export const entriesInitialState: EntriesContextState = {
	entries: [],
	pagination: {
		offset: 0,
		limit: 50,
		search: '',
		sort_by: 'revenue',
		sort_direction: 'desc',
		filters: {
			days: 7,
		},
	},
	error: undefined,
}

export const getEntriesInitialState: ContextStoreInitializer<
	EntriesContextProviderProps['initialState'],
	EntriesContextState
> = (initialState) => {
	if (!initialState) {
		return entriesInitialState
	}

	return {
		...entriesInitialState,
		entries: initialState,
	}
}

export const entriesSlice = createReducer({
	name: 'Entries',
	initialState: entriesInitialState,
	actions: {
		initializeEntries: (state, entries: Entry[]) => {
			state.entries = entries
		},
		setEntry: (state, entry: Entry) => {
			state.entries.unshift(entry)
		},
		setEntryValue: (
			state,
			payload: { id: Entry['id']; key: keyof Entry; value: Entry[keyof Entry] },
		) => {
			const entry = state.entries.find((entry) => entry.id === payload.id)

			if (entry) {
				//@ts-ignore
				entry[payload.key] = payload.value
				entry['date_updated'] = new Date().toISOString()
			}
		},
		deleteEntry: (state, entryId: Entry['id']) => {
			const entryIndex = state.entries.findIndex((entry) => entry.id == entryId)

			if (entryIndex !== -1) {
				state.entries.splice(entryIndex, 1)
			}
		},
	},
}).addThunks((actions) => {
	return {
		importEntries: (e: ChangeEvent<HTMLInputElement>) => async (dispatch) => {
			const file = e.target.files?.[0]

			if (file) {
				loadJSON(file).then(async (entries: unknown) => {
					const payload = formattedEntries(entries)

					await getEntriesDb(payload, (entries) =>
						dispatch(actions.initializeEntries(entries)),
					)
				})
			}
		},
		exportEntries: () => async (_dispatch, getState) => {
			exportFile(
				formattedEntries(getState().entries),
				`Astral-Poet-Entries-${new Date()}`,
			)
		},
		saveEntriesToDb: () => async (_dispatch, getState) => {
			saveEntriesToDb(getState().entries)
		},
	}
})
