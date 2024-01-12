import { FC, useState } from 'react'
import { INDEX_DB_KEY, INDEX_DB_VERSION } from '@/packages/constants'
import { useEffectOnce } from '@/packages/ui'
import Provider from '@/packages/ui/src/contexts/ContextStore/Provider'
import createContextWithName from '@/packages/ui/src/contexts/ContextStore/utils/createContextWithName'
import { INDEX_DB_ENTIRES_KEY } from './constants'
import {
	entriesInitialState,
	entriesSlice,
	getEntriesInitialState,
} from './reducer'
import {
	EntriesContextProviderProps,
	EntriesContextState,
	Entry,
} from './types'

export const EntriesActions = entriesSlice.actions

export const EntriesContext = createContextWithName<
	EntriesContextState,
	typeof EntriesActions
>('Entries', entriesInitialState)

export const {
	StateContext: EntriesStateContext,
	useSelector: useEntriesSelector,
	DispatchContext: EntriesDispatchContext,
	useDispatch: useEntriesDispatch,
} = EntriesContext

export const EntriesContextProvider: FC<EntriesContextProviderProps> = ({
	children,
	initialState,
	...restOfProps
}) => {
	const [cachedInitialState, setCachedInitialState] = useState<Entry[]>()

	useEffectOnce(() => {
		const getData = async () => {
			const request = window.indexedDB.open(
				INDEX_DB_KEY,
				INDEX_DB_VERSION,
				// (upgradeDB) =>
				// 	upgradeDB.createObjectStore(INDEX_DB_ENTIRES_KEY, {
				// 		autoIncrement: true,
				// 	}),
			)

			request.onerror = (_event: any) => {
				console.error("Why didn't you allow my web app to use IndexedDB?!")
			}
			request.onsuccess = async (event: any) => {
				const db: IDBDatabase = await event.target.result
				const transaction = db.transaction([INDEX_DB_ENTIRES_KEY], 'readwrite')
				const objectStore = transaction.objectStore(INDEX_DB_ENTIRES_KEY)
				// const index = objectStore.index('id')

				initialState.forEach((entry) => {
					// const getEntry: IDBRequest<Entry> = objectStore.get(entry.id)

					const request = objectStore.put(entry)

					request.onsuccess = (_event) => {
						// event.target.result === entry.id
					}
				})

				transaction.oncomplete = () => {
					db.close()
				}

				const entriesRequest: IDBRequest<Entry[]> = objectStore.getAll()

				entriesRequest.onsuccess = (event) => {
					//@ts-ignore
					const entries: Entry[] = event.target?.result

					setCachedInitialState(entries)
				}
			}

			request.onupgradeneeded = (event: any) => {
				const db = event.target.result

				// Create an objectStore to hold information about our entries. We're
				// going to use "id" as our key path because it's guaranteed to be
				// unique - or at least that's what I was told during the kickoff meeting.
				const objectStore = db.createObjectStore(INDEX_DB_ENTIRES_KEY, {
					keyPath: 'id',
					autoIncrement: true,
				})

				// Create an index to search entries by id. We want to ensure that
				// no two entries have the same id, so use a unique index.
				objectStore.createIndex('id', 'id', { unique: true })

				// Create an index to search entries by name. We may have duplicates
				// so we can't use a unique index.
				objectStore.createIndex('name', ['name'], { unique: false })

				// Use transaction oncomplete to make sure the objectStore creation is
				// finished before adding data into it.
				objectStore.transaction.oncomplete = (_event: any) => {
					// Store values in the newly created objectStore.
					const customerObjectStore = db
						.transaction(INDEX_DB_ENTIRES_KEY, 'readwrite')
						.objectStore(INDEX_DB_ENTIRES_KEY)

					initialState.forEach((entry) => {
						customerObjectStore.add(entry)
					})
				}
			}
		}

		getData()
	})

	if (!cachedInitialState) return null

	return (
		<Provider
			{...restOfProps}
			StateContext={EntriesStateContext}
			reducer={entriesSlice.reducer}
			initializer={getEntriesInitialState}
			initialState={cachedInitialState}
			DispatchContext={EntriesDispatchContext}
		>
			{children}
		</Provider>
	)
}
