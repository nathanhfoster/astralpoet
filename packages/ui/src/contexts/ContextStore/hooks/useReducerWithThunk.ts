import {
	Dispatch,
	Reducer,
	ReducerAction,
	ReducerState,
	useCallback,
	useRef,
} from 'react'
import { isFunction } from '@packages/utils/src'
import useEffectAfterMount from '../../../hooks/useEffectAfterMount'
import { ThunkAction } from '../types'
import defaultInitializer from '../utils/defaultInitializer'
import getDerivedStateFromProps from '../utils/getDerivedStateFromProps'
import getReducerDefaultState from '../utils/getReducerDefaultState'
import useLazyMemo from './useLazyMemo'
import usePropsThatChanged from './usePropsThatChanged'
import useSetStateReducer from './useSetStateReducer'

/**
 * Augments React's useReducer() hook
 * so that the action dispatcher supports thunks.
 */
const useReducerWithThunk = <R extends Reducer<any, any>>(
	reducer: R,
	initialState: ReducerState<R> = getReducerDefaultState(reducer as any),
	initializer = defaultInitializer,
	derivedStateFromProps?: ReducerState<R>,
): [ReducerState<R>, Dispatch<ReducerAction<R>>] => {
	// Only keep the props that changed to override the state
	const derivedStateFromPropsThatChanged = usePropsThatChanged<R>(
		derivedStateFromProps,
	)

	// Get initial hook state once
	const initialHookState: R = useLazyMemo(
		useCallback(
			() =>
				getDerivedStateFromProps(
					initialState,
					derivedStateFromPropsThatChanged,
				),
			// eslint-disable-next-line react-hooks/exhaustive-deps
			[],
		),
	)

	const [hookState, setHookState] = useSetStateReducer(
		initialHookState,
		initializer,
	)

	// State management
	const state = useRef<ReducerState<R>>(hookState as ReducerState<R>)

	const getState: () => ReducerState<R> = useCallback(
		() => state.current,
		[state],
	)

	const setState = useCallback(
		(newState: ReducerState<R>, callback?: Function) => {
			const derivedState = getDerivedStateFromProps<ReducerState<R>>(
				newState,
				derivedStateFromPropsThatChanged,
			)

			state.current = derivedState
			//@ts-ignore
			setHookState(derivedState, callback)
		},
		[derivedStateFromPropsThatChanged, setHookState],
	)

	// make the state controlled from an HOC by passing derivedStateFromPropsThatChanged
	useEffectAfterMount(() => {
		if (Object.keys(derivedStateFromPropsThatChanged).length > 0) {
			setState(state.current)
		}
	}, [derivedStateFromProps, setState])

	// Reducer
	const reduce = useCallback(
		(action: Dispatch<ReducerAction<R>>) => reducer(getState(), action),
		[reducer, getState],
	)

	// Augmented dispatcher
	const dispatch = useCallback(
		//@ts-ignore
		(action: ThunkAction, callback?: Function) => {
			if (isFunction(action)) {
				return action(dispatch, getState)
			}
			const newState: ReducerState<R> = reduce(action)

			return setState(newState, callback)
		},
		[reduce, getState, setState],
	)

	return [hookState as ReducerState<R>, dispatch as Dispatch<ReducerAction<R>>]
}

export default useReducerWithThunk
