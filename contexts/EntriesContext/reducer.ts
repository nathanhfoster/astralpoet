import { ChangeEvent } from 'react'
import { ContextStoreInitializer } from '@/packages/ui/src/contexts/ContextStore/types'
import createReducer from '@/packages/ui/src/contexts/ContextStore/utils/createReducer'
import getDerivedStateFromProps from '@/packages/ui/src/contexts/ContextStore/utils/getDerivedStateFromProps'
import exportFile from '@/packages/utils/src/exportFile'
import loadJSON from '@/packages/utils/src/loadJSON'
import { getEntriesDb } from './indexedDb'
import {
	EntriesContextProviderProps,
	EntriesContextState,
	Entry,
	ImportedEntry,
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

		setEntryValue: (
			state,
			payload: { id: Entry['id']; key: keyof Entry; value: Entry[keyof Entry] },
		) => {
			const entry = state.entries.find((entry) => entry.id == payload.id)

			if (entry) {
				//@ts-ignore
				entry[payload.key] = payload.value
				entry['date_updated'] = new Date().toISOString()
			}
		},
		setNewEntry: (state, entry: Partial<Entry> = {}) => {
			//@ts-ignore
			if (state.entries.findIndex((e) => e.id == 'new') === -1) {
				state.entries.unshift(
					//@ts-ignore
					getDerivedStateFromProps(
						{
							id: 'new',
							date_created: new Date().toISOString(),
							date_updated: new Date().toISOString(),
							html: "After I've installed Astral Poet today, I will make a diary entry every day from now on. In case I forget to make an entry, the app will remind me with a notification in the evening. In addition to photos, videos, audio recordings or other files, I can also add a location, tags or people to my diary entries.✍ I can use it on all my devices and synchronize the journal with the sync button on the main page. I am already looking forward to revisiting all those memories in a few months or years. ✨",
						},
						entry,
					),
				)
			}
		},
	},
}).addThunks((actions) => {
	return {
		importEntries: (e: ChangeEvent<HTMLInputElement>) => async (dispatch) => {
			const file = e.target.files?.[0]

			if (file) {
				loadJSON(file).then(async (entries: unknown) => {
					const payload = (entries as ImportedEntry[]).map(
						(entry: ImportedEntry) => {
							const newEntry = { ...entry } as unknown as Entry

							return newEntry
						},
					)

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
	}
})
