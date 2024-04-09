import { FC, useState } from 'react'
import { useEffectOnce } from '@/packages/ui'
import Provider from '@/packages/ui/src/contexts/ContextStore/Provider'
import createContextWithName from '@/packages/ui/src/contexts/ContextStore/utils/createContextWithName'
import { getEntriesDb } from './indexedDb'
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
		getEntriesDb(initialState, setCachedInitialState)
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
