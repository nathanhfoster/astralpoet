import { INDEX_DB_KEY, INDEX_DB_VERSION } from '@/packages/constants'
import { INDEX_DB_ENTIRES_KEY } from './constants'
import { Entry } from './types'

export const getEntriesDb = async (
	entries: Entry[],
	setState?: (entries: Entry[]) => any,
) => {
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

		entries.forEach((entry) => {
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

			setState?.(entries)
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
		objectStore.createIndex('_entryId', '_entryId', { unique: true })

		// Create an index to search entries by name. We may have duplicates
		// so we can't use a unique index.
		objectStore.createIndex('title', ['title'], { unique: false })
		objectStore.createIndex('html', ['html'], { unique: false })

		// Use transaction oncomplete to make sure the objectStore creation is
		// finished before adding data into it.
		objectStore.transaction.oncomplete = (_event: any) => {
			// Store values in the newly created objectStore.
			const entriesStore = db
				.transaction(INDEX_DB_ENTIRES_KEY, 'readwrite')
				.objectStore(INDEX_DB_ENTIRES_KEY)

			entries.forEach((entry) => {
				entriesStore.add(entry)
			})
		}
	}
}

export const deleteEntryFromDb = (
	entryId: Entry['id'],
): Promise<IDBRequest<undefined> | undefined> => {
	return new Promise((resolve, reject) => {
		const db = indexedDB.open(INDEX_DB_KEY, INDEX_DB_VERSION)

		db.onsuccess = async () => {
			const transaction = db.result.transaction(
				INDEX_DB_ENTIRES_KEY,
				'readwrite',
			)
			const store = transaction.objectStore(INDEX_DB_ENTIRES_KEY)

			const request = store.delete(entryId)

			transaction.oncomplete = async () => {
				resolve(request)
			}
		}

		db.onerror = (_event: any) => {
			reject('Error')
		}
	})
}

export const getEntriesFromDb = async (): Promise<
	IDBRequest<Entry[]> | undefined
> => {
	return new Promise((resolve, reject) => {
		const db = indexedDB.open(INDEX_DB_KEY, INDEX_DB_VERSION)

		db.onsuccess = async () => {
			const transaction = db.result.transaction(
				INDEX_DB_ENTIRES_KEY,
				'readwrite',
			)
			const store = transaction.objectStore(INDEX_DB_ENTIRES_KEY)

			const entriesRequest: IDBRequest<Entry[]> = store.getAll()

			transaction.oncomplete = () => {
				resolve(entriesRequest)
			}
		}

		db.onerror = (_event: any) => {
			reject('Error')
		}
	})
}

export const getEntryFromDb = async (
	entryId: Entry['id'],
): Promise<IDBRequest<Entry> | undefined> => {
	return new Promise((resolve, reject) => {
		const db = indexedDB.open(INDEX_DB_KEY, INDEX_DB_VERSION)

		db.onsuccess = async (_event: any) => {
			const transaction = db.result.transaction(
				INDEX_DB_ENTIRES_KEY,
				'readwrite',
			)
			const store = transaction.objectStore(INDEX_DB_ENTIRES_KEY)

			const entry: IDBRequest<Entry> = store.get(entryId)

			transaction.oncomplete = async () => {
				resolve(entry)
			}
		}

		db.onerror = (_event: any) => {
			reject('Error')
		}
	})
}

export const saveEntryToDb = async (
	entry: Entry,
): Promise<IDBRequest<number> | undefined> => {
	return new Promise((resolve, reject) => {
		const db = indexedDB.open(INDEX_DB_KEY, INDEX_DB_VERSION)

		db.onsuccess = async () => {
			const transaction = db.result.transaction(
				INDEX_DB_ENTIRES_KEY,
				'readwrite',
			)
			const store = transaction.objectStore(INDEX_DB_ENTIRES_KEY)

			const request = store.put(entry)

			transaction.oncomplete = async () => {
				resolve(request as IDBRequest<number>)
			}
		}

		db.onerror = (_event: any) => {
			reject('Error')
		}
	})
}

export const saveEntriesToDb = (entries: Entry[]) => {
	const db = indexedDB.open(INDEX_DB_KEY, INDEX_DB_VERSION)

	db.onsuccess = async () => {
		const transaction = db.result.transaction(INDEX_DB_ENTIRES_KEY, 'readwrite')
		const store = transaction.objectStore(INDEX_DB_ENTIRES_KEY)

		entries.forEach((entry) => {
			store.put(entry)
		})
	}
}
