// import { FilterValues } from "../../../ops/services/api/types";
// import {
//   EntriesResponse,
//   EntriesResponseItem,
// } from "../../services/apoloClient/queries/Deal/types";

import {
	ContextProviderProps,
	ContextStore,
	PayloadAction,
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

export interface Entry {
	id: number
	name: string
}

export const INITIALIZE_ENTRIES = 'INITIALIZE_ENTRIES'
export type InitializeEntriesAction = PayloadAction<
	typeof INITIALIZE_ENTRIES,
	Entry[]
>

export type EntriesContextActions = InitializeEntriesAction
