import { useCallback, useEffect, useReducer, useRef } from 'react'
import { DEFAULT_DISPATCH_CONTEXT } from '../constants'
import setObjectStateReducer from '../reducers/setStateObjectReducer'
import defaultInitializer from '../utils/defaultInitializer'

/**
 * Mimics React.Component this.state and this.setState
 */
const useSetStateReducer = <S extends {}>(
	initializerArg: S = {} as S,
	initializer = defaultInitializer,
) => {
	// Temporarily holds the reference to a callback
	const callbackRef = useRef(DEFAULT_DISPATCH_CONTEXT)
	const [state, dispatch] = useReducer(
		setObjectStateReducer,
		initializerArg,
		initializer,
	)

	/**
	 * Augments the dispatch to accept a callback as a second parameter
	 */
	const setState = useCallback(
		(updater: S, callback: typeof DEFAULT_DISPATCH_CONTEXT) => {
			callbackRef.current = callback ?? DEFAULT_DISPATCH_CONTEXT
			dispatch(updater)
		},
		[],
	)

	// Call the callback after every state change
	useEffect(() => {
		//@ts-ignore
		callbackRef.current(state)
		callbackRef.current = DEFAULT_DISPATCH_CONTEXT
	}, [state])

	return [state, setState] as [S, (state: Partial<S>) => void]
}

export default useSetStateReducer
