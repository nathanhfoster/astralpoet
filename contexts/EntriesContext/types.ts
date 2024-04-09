import {
	ContextProviderProps,
	ContextStore,
} from '@packages/ui/contexts/ContextStore/types'
import { Ensure } from '@packages/ui/types'

export type EntriesContextProviderProps = Ensure<
	ContextProviderProps<Entry[]>,
	'initialState'
>
export type EntriesContextState = ContextStore<{
	entries: Entry[]
	pagination: {}
	error?: string
}>

export interface EntityTimeStamp {
	date_created: string
	date_updated: string
}

export interface EntryFile extends EntityTimeStamp {
	id: number
	file_type: string
	name: string
	size: number
	url: string
	date_modified: string
	entry_id: number
}

export interface Entry extends EntityTimeStamp {
	id: number
	author: number
	title: string
	html: string
	tags: string
	people: string
	address: string
	latitude: string
	longitude: string
	date_created_by_author: string
	views: number
	rating: number
	EntryFiles: EntryFile[]
	is_public: boolean
	size: number
	_size: number
	_shouldDelete: boolean
	_shouldPost: boolean
}

export interface ImportedEntry
	extends Omit<
		Entry,
		| 'id'
		| 'views'
		| 'rating'
		| 'EntryFiles'
		| 'is_public'
		| 'size'
		| '_size'
		| '_shouldDelete'
		| '_shouldPost'
	> {
	id: string
	views: string
	rating: string
	EntryFiles: string
	is_public: string
	size: string
	_size: string
	_shouldDelete: string
	_shouldPost: string
}
