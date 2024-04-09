import { FC } from 'react'
import { isFunction } from '@packages/utils/src'
import useReducerWithThunk from '../hooks/useReducerWithThunk'
import setStateReducer from '../reducers/setStateReducer'
import defaultInitializer from '../utils/defaultInitializer'
import type { ProviderProps } from './types'

const Provider: FC<ProviderProps> = ({
	id,
	StateContext: StateContext,
	reducer = setStateReducer,
	derivedStateFromProps,
	//@ts-ignore
	initialState = derivedStateFromProps ?? StateContext?._currentValue,
	initializer = defaultInitializer,
	DispatchContext: DispatchContext,
	children,
}) => {
	const [state, dispatch] = useReducerWithThunk(
		reducer,
		initialState,
		initializer,
		derivedStateFromProps,
	)

	const StateContextProvider = (
		<StateContext.Provider
			value={state}
			//@ts-ignore
			displayName={`${StateContext.displayName}${id ? `-${id}` : ''}`}
		>
			{isFunction(children) ? (
				<StateContext.Consumer>{children}</StateContext.Consumer>
			) : (
				children
			)}
		</StateContext.Provider>
	)

	if (!DispatchContext) {
		return StateContextProvider
	}

	return (
		<DispatchContext.Provider
			value={dispatch}
			//@ts-ignore
			displayName={DispatchContext.displayName}
		>
			{StateContextProvider}
		</DispatchContext.Provider>
	)
}

export default Provider
