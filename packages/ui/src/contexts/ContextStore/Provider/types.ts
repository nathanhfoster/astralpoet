import { Context, ReactNode, Reducer } from 'react'
import { ContextStoreInitializer } from '../types'

export type ProviderProps<S = any, A = any> = {
	id?: string
	StateContext: Context<S>
	reducer?: Reducer<S, A>
	initialState?: S
	initializer?: ContextStoreInitializer<A, S>
	derivedStateFromProps?: S
	DispatchContext?: Context<A>
	children: ReactNode | ((...args: any[]) => any)
}
