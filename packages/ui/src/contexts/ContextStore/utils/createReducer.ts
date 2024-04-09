import { produce, setAutoFreeze } from 'immer'
import { PayloadAction, Thunk, ThunkFunction } from '../types'
import {
	CreateReducerActions,
	CreateReducerProps,
	InitialReducerState,
	ReducerActionCreators,
} from './createReducer.types'
import { ActionsUnionType } from './tsHelpers'

setAutoFreeze(false)

const createReducer = <
	N extends string,
	S extends InitialReducerState,
	A extends CreateReducerActions<S>,
>(
	props: CreateReducerProps<N, S, A>,
) => {
	const actions: ReducerActionCreators<A, N> = Object.keys(
		props.actions,
	).reduce((acc: any, actionName: string) => {
		acc[actionName] = (payload: any) => ({
			type: props.name + '/' + actionName,
			payload,
		})

		return acc
	}, {} as any)

	const reducer = (state = props.initialState, action: PayloadAction) => {
		const [actionReducerName, actionType] = action.type.split('/')

		const reducerActionFuction = props.actions[actionType]

		if (actionReducerName === props.name && reducerActionFuction) {
			return produce(state, (draft: any) => {
				return reducerActionFuction(draft, action.payload) as any
			})
		}

		return state
	}

	const addThunks = <
		TA extends {
			[key: string]: ThunkFunction<
				any,
				S,
				ActionsUnionType<typeof actions> | Thunk<any, S>
			>
		},
	>(
		thunks: (thunksAction: ReducerActionCreators<A, N>) => TA,
	) => {
		return {
			actions: { ...actions, ...thunks(actions) },
			reducer,
		}
	}

	return { actions, reducer, addThunks }
}

export default createReducer
